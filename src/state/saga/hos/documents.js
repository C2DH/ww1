import { put, select, fork, call, all } from 'redux-saga/effects'
import { identity, omit } from 'lodash'
import qs from 'query-string'
import { takeLatestAndCancel } from '../effects/take'

export const DEFAULT_PAGE_SIZE = 50

// Saga for documents
const makeDocuments = (
  actionType,
  apiFn,
  selectState,
  pageSize = DEFAULT_PAGE_SIZE,
  transform = identity,
) => {
  function* handleGetDocumentsList({ payload: { params, reset, crossFacets } }) {
    yield put({ type: `${actionType}_LOADING` })
    try {
      const offset = reset
        ? 0
        : yield select(state => selectState(state).list.pagination.offset)

      const { results, next, count } = yield call(apiFn, {
        ...params,
        limit: pageSize,
        offset,
      })

      // Calculate cross facets
      let facets = {}
      if (crossFacets) {
        const facetsCalls = [
          // Facets for data types omit data type filter
          call(apiFn, {
            ...omit(params, [
              'filters.data__type__in',
            ]),
            facets: ['data__type'],
            facets_only: true,
          }),
          // Facets for years
          call(apiFn, {
            ...omit(params, [
              'filters.data__year__isnull',
              'overlaps',
            ]),
            facets: ['data__year'],
            facets_only: true,
          }),
        ]

        const facetsResults = yield all(facetsCalls)
        // Merge facets field of all responses
        facets = facetsResults.reduce((f, r) => ({
          ...f,
          ...r.facets,
        }), {})
      }

      const nextOffset = next ? +qs.parse(qs.extract(next)).offset : null
      yield put({
        type: `${actionType}_SUCCESS`,
        payload: {
          results: transform(results),
          offset: nextOffset,
          count,
          reset,
          facets,
        },
      })
    } catch (error) {
      yield put({ type: `${actionType}_FAILURE`, error })
    }
  }

  function *handleGetDocumentsMeta() {
    yield put({ type: `${actionType}_META_LOADING` })
    try {
      const data = yield call(apiFn, {
        facets: ['data__type', 'data__year'],
      })
      yield put({ type: `${actionType}_META_SUCCESS`, payload: data })
    } catch (error) {
      yield put({ type: `${actionType}_META_FAILURE`, error })
    }
  }

  return function* watchGetDocumentsList() {
    yield fork(
      takeLatestAndCancel,
      actionType,
      `${actionType}_UNLOAD`,
      handleGetDocumentsList
    )
    yield fork(
      takeLatestAndCancel,
      `${actionType}_META`,
      `${actionType}_META_UNLOAD`,
      handleGetDocumentsMeta
    )
  }
}

export default makeDocuments
