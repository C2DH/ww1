import { createSelector } from 'reselect'
import { memoize, isNull, get, mapValues, includes, chunk, map, range, find, omit } from 'lodash'

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
  translated: translateObject(story.metadata, lang.code, [
    'title',
    'abstract',
  ])
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

const makeDocumentsMetaSelectors = selectState => {
  // Generic facets
  const getDocumentsTotalFacets = state => selectState(state).meta.facets
  const getDocumentsFacets = state => selectState(state).list.facets

  // Data types facets
  const getDocumentsDataTypesFacets = createSelector(
    getDocumentsTotalFacets,
    getDocumentsFacets,
    (totalFacets, currentFacets) => get(totalFacets, 'data__type', []).map(({ data__type }) => ({
      data__type,
      count: get(find(get(currentFacets, 'data__type', []), { data__type }), 'count', null)
    }))
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

// Timeline documents

export const [
  getTimelineDocuments,
  canLoadMoreTimelineDocuments,
  getTimelineDocumentsCount,
  getTimelineDocumentsLoading,
] = makeDocumentsListSelectors(state => state.timelineDocuments)

// Map documents

export const [
  getMapDocuments,
  canLoadMoreMapDocuments,
  getMapDocumentsCount,
  getMapDocumentsLoading,
] = makeDocumentsListSelectors(state => state.mapDocuments)

export const [
  getMapDocumentsDataTypesFacets,
  getMapDocumentsYearsFacets,
  getMapDocumentsFilteredYearsFacets,
  getMapDocumentsUncertainYears,
  getMapDocumentsTotalCount,
] = makeDocumentsMetaSelectors(state => state.mapDocuments)

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

// TODO: In a real world this should switch between module types...
const translateModule = memoize((module, language) => maybeNull(module)(module => ({
  ...module,
  text: translateObject(module.text, language, ['content']),
})))

export const getModule = (state, moduleIndex) =>
  maybeNull(getChapter(state))(chapter => {
    const module = get(chapter, `contents.modules[${moduleIndex - 1}]`, null)
    const language = getCurrentLanguage(state)
    return translateModule(module, language)
  })
