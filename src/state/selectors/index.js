import { createSelector, defaultMemoize } from 'reselect'
import moment from 'moment'
import {
  memoize,
  keys,
  groupBy,
  isNull,
  get,
  mapValues,
  keyBy,
  isPlainObject,
  difference,
  isArray,
  includes,
  chunk,
  map,
  range,
  find,
  findIndex,
  omit,
  reduce
} from 'lodash'
import { compose } from 'lodash/fp'

// fp <3
const maybeNull = a => fn => isNull(a) ? null : fn(a)

// Languages
export const getLanguages = state => state.languages

export const getCurrentLanguage = createSelector(
  state => getLanguages(state),
  state => state.settings.language,
  (languages, currentLangCode) => find(languages, { code: currentLangCode })
)

// Generic translate object with this shape:
// {
//   ...
//   description: {
//     en: 'Luzemburg is supercool',
//     it: 'Pasta Pizza',
//     ...
//   }
// }
// to ->
// {
//   description: 'Pasta Pizza'
// }

const translate = (value, lang, fallbackLang = 'en_US') => {
  const defaultTrans = isNull(fallbackLang)
    ? null
    : get(value, fallbackLang)

  return get(value, lang, defaultTrans)
}

const translateObject = (data, lang, transKeys = '*', fallbackLang = 'en_US') =>
  mapValues(data, (value, key) => {
    if (!includes(transKeys, key)) {
      return value
    }
    return translate(value, lang, fallbackLang)
  })

// Translate a document using given language
export const translateDocument = lang => doc => ({
  ...doc,
  translated: translateObject(doc.data, lang.code, [
    'title',
    'description',
    'repository',
    'date',
    'copyright',
  ]),
  documents: (doc.documents || []).map(doc => translateDocument(lang)(doc))
})

const translateStory = lang => story => ({
  ...story,
  translated: translateObject(story.data, lang.code, [
    'title',
    'abstract',
  ]),
  stories: get(story, 'stories', []).map(translateStory(lang))
})

// Make base paginate list state selectors
const makePaginateListSelectors = selectState => {
  const getIds = state => selectState(state).ids
  const getData = state => selectState(state).data
  const getLoading = state => selectState(state).loading
  const getPagination = state => selectState(state).pagination
  const getCount = state => getPagination(state).count

  const makeList = (ids, data) => maybeNull(ids)(ids => ids.map(id => data[id]))
  const checkCanLoadMore = pagination => pagination.offset !== null

  const getAllList = createSelector(getIds, getData, makeList)

  const canLoadMore = createSelector(getPagination, checkCanLoadMore)

  return [getAllList, canLoadMore, getCount, getLoading]
}

const makeDocumentsListSelectors = selectState => {
  // Base list selectors
  const [
    getDocumentsUntranslated,
    canLoadMoreDocuments,
    getDocumentsCount,
    getDocumentsLoading,
  ] = makePaginateListSelectors(state => selectState(state).list)

  // Translated list of documents
  const getDocuments = createSelector(
    getDocumentsUntranslated,
    getCurrentLanguage,
    (docs, lang) => maybeNull(docs)(docs => docs.map(translateDocument(lang)))
  )

  return [
    getDocuments,
    canLoadMoreDocuments,
    getDocumentsCount,
    getDocumentsLoading,
  ]
}

// Documents facets
const intersectFacets = (totalFacets, currentFacets, facetName) => get(totalFacets, facetName, []).map(facet => ({
  [facetName]: get(facet, facetName),
  count: get(find(get(currentFacets, facetName, []), { [facetName]: get(facet, facetName) }), 'count', 0) /*null */
}))


const makeDocumentsMetaSelectors = (selectState, dataTypeFacetName = 'data__type') => {
  // Generic facets
  const getDocumentsTotalFacets = state => selectState(state).meta.facets
  const getDocumentsFacets = state => selectState(state).list.facets

  // Data types facets
  const getDocumentsDataTypesFacets = createSelector(
    getDocumentsTotalFacets,
    getDocumentsFacets,
    (totalFacets, currentFacets) => intersectFacets(totalFacets, currentFacets, dataTypeFacetName)
  )

  const makeYearsFacetsUnsum = facets =>
    get(facets, 'data__year', []).reduce((r, f) => ({
      ...r,
      [f.data__year]: f.count,
    }), {})

  // TODO: Move this hardcoed shit away
  const MIN_YEAR = 1914
  const MAX_YEAR = 1920
  const makeYearsFacets = facets =>
    reduce(makeYearsFacetsUnsum(facets), (r, count, year) => {
      if (year < MIN_YEAR) {
        return { ...r, [`<${MIN_YEAR}`]: get(r, `<${MIN_YEAR}`, 0) + count }
      } else if (year > MAX_YEAR) {
        return { ...r, [`${MAX_YEAR}>`]: get(r, `${MAX_YEAR}>`, 0) + count }
      } else {
        return { ...r, [year]: count }
      }
    }, {})

  const getDocumentsYearsFacets = createSelector(
    getDocumentsTotalFacets,
    facets => omit(makeYearsFacets(facets), 'uncertain')
  )

  const getDocumentsFilteredYearsFacets = createSelector(
    getDocumentsFacets,
    facets => omit(makeYearsFacets(facets), 'uncertain')
  )

  const getDocumentsUncertainYears = createSelector(
    getDocumentsFacets,
    facets => get(makeYearsFacets(facets), 'uncertain')
  )

  // Count from meta info
  const getDocumentsTotalCount = state => selectState(state).meta.count

  return [
    getDocumentsDataTypesFacets,
    getDocumentsYearsFacets,
    getDocumentsFilteredYearsFacets,
    getDocumentsUncertainYears,
    getDocumentsTotalCount,
  ]
}

const makeDocumentsAutocompleteSelectors = (selectState) => {
  const getDocumentsAutocompleteSearchTerm = state =>
    selectState(state).autocomplete.term

  const getDocumentsAutocompleteResults = state =>
    selectState(state).autocomplete.results

  return [
    getDocumentsAutocompleteSearchTerm,
    getDocumentsAutocompleteResults,
  ]
}

// const getDocumentsGrid = createSelector(
//   getDocuments,
//   documents => chunk(documents, 4).map(grid => ({
//     docs: grid,
//     key: map(grid, 'id').join('-')
//   }))
// )

// Document detail

export const getDocument = createSelector(
  state => state.document.data,
  state => getCurrentLanguage(state),
  (doc, lang) => maybeNull(doc)(translateDocument(lang))
)
export const getDocumentLoading = state => state.document.loading

// Collection documents

export const [
  getCollectionDocuments,
  canLoadMoreCollectionDocuments,
  getCollectionDocumentsCount,
  getCollectionDocumentsLoading,
] = makeDocumentsListSelectors(state => state.collectionDocuments)


export const [
  getCollectionDocumentsDataTypesFacets,
  getCollectionDocumentsYearsFacets,
  getCollectionDocumentsFilteredYearsFacets,
  getCollectionDocumentsUncertainYears,
  getCollectionDocumentsTotalCount,
] = makeDocumentsMetaSelectors(state => state.collectionDocuments)

export const [
  getCollectionDocumentsAutocompleteSearchTerm,
  getCollectionDocumentsAutocompleteResults,
] = makeDocumentsAutocompleteSelectors(state => state.collectionDocuments)

// Map documents

export const [
  getDummyMapDocuments,
  canLoadMoreMapDocuments,
  getMapDocumentsCount,
  getMapDocumentsLoading,
] = makeDocumentsListSelectors(state => state.mapDocuments)

export const [
  getMapDocumentsAutocompleteSearchTerm,
  getMapDocumentsAutocompleteResults,
] = makeDocumentsAutocompleteSelectors(state => state.mapDocuments)

export const getMapDocuments = createSelector(
  getDummyMapDocuments,
  docs => maybeNull(docs)(docs => docs.map(doc => ({
    ...doc,
    coordinates: get(doc, 'data.coordinates.geometry.coordinates', [])
      .slice(0, 2)
      // For same positin problem....
      .map(x => Number(x) + Math.random() / 1000)
      .reverse()
  })))
)

export const [
  getMapDocumentsDataPlaceTypesFacetsUnsorted,
  getMapDocumentsYearsFacets,
  getMapDocumentsFilteredYearsFacets,
  getMapDocumentsUncertainYears,
  getMapDocumentsTotalCount,
] = makeDocumentsMetaSelectors(state => state.mapDocuments, 'data__place_type')

export const getMapDocumentsDataPlaceTypesFacets = createSelector(
  getMapDocumentsDataPlaceTypesFacetsUnsorted,
  facets => {
    // Hardcoding 4ever <3
    const index = findIndex(facets, { data__place_type: 'other' })
    if (index >= 0) {
      return facets.slice(0, index)
        .concat(facets.slice(index + 1, facets.length))
        .concat(facets[index])
    }
    return facets
  }
)

// Timeline documents

export const [
  getTimelineDocuments,
  canLoadMoreTimelineDocuments,
  getTimelineDocumentsCount,
  getTimelineDocumentsLoading,
] = makeDocumentsListSelectors(state => state.timelineDocuments)

export const getTimelineValidMonthsByYears = createSelector(
  getTimelineDocuments,
  docs => maybeNull(docs)(docs => {
    return mapValues(groupBy(docs, d => {
      const [docYear,docMonth] = d.data.date.original.split('-')
      return docYear
    }), docs => groupBy(docs, d => {
      const [docYear,docMonth] = d.data.date.original.split('-')
      return docMonth
    }))
  })
)

export const getTimelineYears = createSelector(
  getTimelineDocuments,
  docs => maybeNull(docs)(docs => {
    return keys(groupBy(docs, d => {
      const [docYear,docMonth] = d.data.date.original.split('-')
      return docYear
    })).map(y => +y)
  })
)

// Fuck off waypoint today giova win :D!
export const getTimelineVisibleDocuments = createSelector(
  state => state.timelineDocuments.list.ids,
  state => state.timelineDocuments.list.data,
  state => state.timelineDocuments.visibleDocuments,
  (ids, data, visibleByIndex) => maybeNull(ids)(ids =>
    Object.keys(visibleByIndex)
      .reduce((r, index) => {
        if (visibleByIndex[index]) {
          return r.concat(+index)
        }
        return r
      }, [])
      .sort()
      .map(index => data[ids[index]])
  )
)

export const getLastVisibleDoc = createSelector(
  getTimelineVisibleDocuments,
  visibleDocs => maybeNull(visibleDocs)(visibleDocs => {
    if (visibleDocs.length > 0) {
      return visibleDocs[0]
    }
    return null
  })
)

export const getViewedYearAndMonth = createSelector(
  getLastVisibleDoc,
  (doc) => {
    if (isNull(doc)) {
      return {
        viewedYear: null,
        viewedMonth: null,
      }
    }
    const m = moment(doc.data.start_date)
    return {
      viewedYear: m.year(),
      viewedMonth: m.month() + 1,
    }
  }
)

// Resource Documents

export const [
  getResourceDocuments,
  canLoadMoreResourceDocuments,
  getResourceDocumentsCount,
  getResourceDocumentsLoading,
] = makeDocumentsListSelectors(state => state.resourceDocuments)

// Static story

const translateStaticStory = lang => story => ({
  ...story,
  data: translateObject(story.data, lang.code, [
    'content',
  ])
})

export const getStaticStory = createSelector(
  state => state.staticStoryDetail.data,
  getCurrentLanguage,
  (theme, lang) => maybeNull(theme)(translateStaticStory(lang))
)

// Themes

export const getThemes = createSelector(
  state => state.themes.list,
  getCurrentLanguage,
  (themes, lang) => maybeNull(themes)(themes => themes.map(translateStory(lang)))
)
export const getThemesLoading = state => state.themes.loading
export const getThemesError = state => state.themes.error

const fixThemeChaptersOrder = theme => {
  const chaptersById = keyBy(theme.stories, 'id')

  const allChaptersIds = keys(chaptersById).map(id => +id)
  const orderedChaptersIds = get(theme, 'data.chapters', [])

  let ids = orderedChaptersIds.reduce((r, id) => {
    if (chaptersById[id]) {
      return r.concat(id)
    }
    return r
  }, [])
  const chapters = ids.concat(difference(allChaptersIds, ids))
    .map(id => chaptersById[id])
  return {
    ...theme,
    stories: chapters,
  }
}

export const getTheme = createSelector(
  state => state.themeDetail.data,
  getCurrentLanguage,
  (theme, lang) => maybeNull(theme)(
    compose(translateStory(lang), fixThemeChaptersOrder))
)

// Chapters

export const getChapter = createSelector(
  state => state.chapterDetail.data,
  getCurrentLanguage,
  (theme, lang) => maybeNull(theme)(translateStory(lang))
)

export const getChapterIndex = createSelector(
  getTheme,
  getChapter,
  (theme, chapter) => maybeNull(theme)(() => maybeNull(chapter)(() =>
    findIndex(theme.stories, { id: chapter.id })
  ))
)

export const getTotalThemeChapters = createSelector(
  getTheme,
  theme => maybeNull(theme)(theme => theme.stories.length)
)

export const getTotalChapterModules = createSelector(
  getChapter,
  chapter => maybeNull(chapter)(chapter => get(chapter, `contents.modules`, []).length)
)

// Modules

const translateModuleText = (module, langCode) => ({
  ...module,
  text: translateObject(module.text, langCode, ['content']),
})

const translateModuleObject = (module, langCode) => translateObject(module, langCode, ['caption'])
const translateModuleGallery = (module, langCode) => translateObject(module, langCode, ['caption'])
const translateModuleMap = (module, langCode) => translateObject(module, langCode, ['caption'])
const translateModuleTextObject = (module, langCode) => ({
  ...module,
  object: translateObject(module.object, langCode, ['caption']),
  text: translateObject(module.text, langCode, ['content'])
})

const translateModuleTextMap = (module, langCode) => ({
  ...module,
  map: translateObject(module.map, langCode, ['caption']),
  text: translateObject(module.text, langCode, ['content'])
})

const translateModuleTextGallery = (module, langCode) => ({
  ...module,
  gallery: translateObject(module.gallery, langCode, ['caption']),
  text: translateObject(module.text, langCode, ['content'])
})

const translateModule = (module, langCode) => maybeNull(module)(module => {
  switch (module.module) {
    case 'text':
      return translateModuleText(module, langCode)
    case 'object':
      return translateModuleObject(module, langCode)
    case 'gallery':
      return translateModuleGallery(module, langCode)
    case 'map':
      return translateModuleMap(module, langCode)
    case 'text_object':
      return translateModuleTextObject(module, langCode)
    case 'text_map':
      return translateModuleTextMap(module, langCode)
    case 'text_gallery':
      return translateModuleTextGallery(module, langCode)

    default:
      return module
  }
})

const joinIds = (source, obj) => {
  const sourceById = keyBy(source, 'id')

  const mapIds = obj => mapValues(obj, (v, k, o) => {
    if (isPlainObject(v)) {
      return mapIds(v)
    }
    if (isArray(v)) {
      return v.map(e => {
        if (isPlainObject(e)) {
          return mapIds(e)
        }
        return e
      })
    }
    if (k === 'id' && (typeof v === 'number' || typeof v === 'string')) {
      return get(sourceById, v, v)
    }
    return v
  })

  return mapIds(obj)
}

const getClearModule = createSelector(
  getChapter,
  (_, index) => index,
  (chapter, index) => {
    return maybeNull(chapter)(() =>
      get(chapter, `contents.modules[${index - 1}]`, null)
    )
  }
)

export const makeGetModule = () => {
  return createSelector(
    getChapter,
    getClearModule,
    getCurrentLanguage,
    (chapter, module, lang) => {
      return maybeNull(module)(() => {
        const transModule = translateModule(module, lang.code)
        return joinIds(chapter.documents.map(d => ({ ...d, id: d.document_id })).map(translateDocument(lang)), transModule)
      })
    }
  )
}

// Educational

const translateEdu = (edu, langCode) => ({
  ...edu,
  data: {
    ...translateObject(edu.data, langCode, [
      'title',
      'activity',
    ]),
    requirements: get(edu, 'data.requirements', []).map(v => translate(v, langCode)),
    steps: get(edu, 'data.steps', []).map(v => translateObject(v, langCode, ['title', 'description'])),
  }
})

const makeEdu = (edu, lang) => {
  const transEdu = translateEdu(edu, lang.code)
  const docs = get(edu, 'documents', [])
    .map(d => ({ ...d, id: d.document_id }))
    .map(translateDocument(lang))
  return {
    ...transEdu,
    contents: mapValues(joinIds(docs, get(edu, 'contents', {})), v => v.id)
  }
}

export const getEducational = createSelector(
  state => state.educationalDetail.data,
  getCurrentLanguage,
  (edu, lang) => maybeNull(edu)(() => makeEdu(edu, lang))
)

export const getEducationals = createSelector(
  state => state.educationals.list,
  getCurrentLanguage,
  (edus, lang) => maybeNull(edus)(() => edus.map(edu => makeEdu(edu, lang)))
)
