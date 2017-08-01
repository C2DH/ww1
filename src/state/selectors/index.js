import { createSelector, defaultMemoize } from 'reselect'
import { memoize, isNull, get, mapValues, keyBy, isPlainObject, isArray, includes, chunk, map, range, find, omit } from 'lodash'

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
const translateObject = (data, lang, transKeys = '*', fallbackLang = 'en') =>
  mapValues(data, (value, key) => {
    if (!includes(transKeys, key)) {
      return value
    }
    const defaultTrans = isNull(fallbackLang)
      ? null
      : get(value, fallbackLang)

    return get(value, lang, defaultTrans)
  })

// Translate a document using given language
const translateDocument = lang => doc => ({
  ...doc,
  translated: translateObject(doc.data, lang.code, [
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

  const makeYearsFacets = facets =>
    get(facets, 'data__year', []).reduce((r, f) => ({
      ...r,
      [f.data__year]: f.count,
    }), {})

  const getDocumentsYearsFacets = createSelector(
    getDocumentsTotalFacets,
    facets => omit(makeYearsFacets(facets), null)
  )

  const getDocumentsFilteredYearsFacets = createSelector(
    getDocumentsFacets,
    facets => omit(makeYearsFacets(facets), null)
  )

  const getDocumentsUncertainYears = createSelector(
    getDocumentsFacets,
    facets => get(makeYearsFacets(facets), null)
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
  getMapDocumentsDataPlaceTypesFacets,
  getMapDocumentsYearsFacets,
  getMapDocumentsFilteredYearsFacets,
  getMapDocumentsUncertainYears,
  getMapDocumentsTotalCount,
] = makeDocumentsMetaSelectors(state => state.mapDocuments, 'data__place_type')

// Timeline documents

export const [
  getTimelineDocuments,
  canLoadMoreTimelineDocuments,
  getTimelineDocumentsCount,
  getTimelineDocumentsLoading,
] = makeDocumentsListSelectors(state => state.timelineDocuments)

// Themes

export const getThemes = createSelector(
  state => state.themes.list,
  getCurrentLanguage,
  (themes, lang) => maybeNull(themes)(themes => themes.map(translateStory(lang)))
)
// export const getThemes = state => state.themes.list
export const getThemesLoading = state => state.themes.loading
export const getThemesError = state => state.themes.error

export const getTheme = createSelector(
  state => state.themeDetail.data,
  getCurrentLanguage,
  (theme, lang) => maybeNull(theme)(translateStory(lang))
)

// Chapters

export const getChapter = createSelector(
  state => state.chapterDetail.data,
  getCurrentLanguage,
  (theme, lang) => maybeNull(theme)(translateStory(lang))
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

// TODO: In a real world this should switch between module types...
const translateModule = (module, langCode) => maybeNull(module)(module => {
  switch (module.module) {
    case 'text':
      return translateModuleText(module, langCode)
    case 'object':
      return translateModuleObject(module, langCode)
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
    return get(chapter, `contents.modules[${index - 1}]`, null)
  }
)

export const makeGetModule = () => {
  return createSelector(
    getChapter,
    getClearModule,
    getCurrentLanguage,
    (chapter, module, lang) => {
      const transModule = translateModule(module, lang.code)
      return joinIds(chapter.documents.map(d => ({ ...d, id: d.document_id })), transModule)
    }
  )
}
