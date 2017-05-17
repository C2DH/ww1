import { createSelector } from 'reselect'
import { isNull, get, mapValues, includes } from 'lodash'

// fp <3
const maybeNull = a => fn => isNull(a) ? null : fn(a)

const makePaginateCollectionSelectors = selectState => {
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

const [
  getDocumentsUntranslated,
  canLoadMoreDocuments,
  getDocumentsCount,
  getDocumentsLoading,
] = makePaginateCollectionSelectors(state => state.documents)

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
    if (transKeys === '*' || !includes(transKeys, key)) {
      return value
    }
    const defaultTrans = isNull(fallbackLang)
      ? null
      : get(value, fallbackLang)

    return get(value, lang, defaultTrans)
  })



const translateDocument = lang => doc => ({
  ...doc,
  // TODO: Find coolest name
  transData: translateObject(doc.data, lang, [
    'description',
    'repository',
    'date',
  ])
})

const getDocuments = createSelector(
  getDocumentsUntranslated,
  state => state.settings.language,
  (docs, lang) => maybeNull(docs)(docs => docs.map(translateDocument(lang)))
)

export {
  getDocuments,
  canLoadMoreDocuments,
  getDocumentsCount,
  getDocumentsLoading,
}