import { put, select, fork, call, all } from 'redux-saga/effects'
import { identity, omit, map, keys } from 'lodash'
import qs from 'query-string'
import { takeLatestAndCancel } from '../effects/take'
import * as api from '../../../api'

export const DEFAULT_PAGE_SIZE = 50

/**
  facetsConfig: [
    // Facet
    data__type: [
      // List of params to omit to calculate cross facets
      'filters.data__type__in'
    ],
    data__year: [
     'filters.data__year__isnull',
      'overlaps',
    ]
],
  ]
**/

// Saga for documents
const makeDocuments = (
  actionType,
  apiFn,
  selectState,
  facetsConfig,
  pageSize = DEFAULT_PAGE_SIZE,
  apiSuggestFn = api.suggestDocuments,
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
      let facets = null
      if (crossFacets && facetsConfig) {
        // Make a call per facet and omit related params to calculate cross facets
        const facetsCalls = map(facetsConfig, (paramsForFacet, facet) => {
          const facetParams = typeof paramsForFacet === 'function'
            ? paramsForFacet(params)
            : omit(params, paramsForFacet)
          return call(apiFn, {
            ...facetParams,
            facets: [facet],
            facets_only: true,
          })
        })

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

  function *handleGetDocumentsMeta({ payload = { params: {} } }) {
    yield put({ type: `${actionType}_META_LOADING` })
    try {
      const data = yield call(apiFn, {
        ...payload.params,
        facets: keys(facetsConfig),
        facets_only: true,
      })
      yield put({ type: `${actionType}_META_SUCCESS`, payload: data })
    } catch (error) {
      yield put({ type: `${actionType}_META_FAILURE`, error })
    }
  }

  function *handleGetDocumentsAutocomplete({ payload: { term } }) {
    yield put({ type: `${actionType}_AUTOCOMPLETE_SEARCH_LOADING` })
    try {
      const data = yield call(apiSuggestFn, term)
      yield put({ type: `${actionType}_AUTOCOMPLETE_SEARCH_SUCCESS`, payload: data })
    } catch (error) {
      yield put({ type: `${actionType}_AUTOCOMPLETE_SEARCH_FAILURE`, error })
    }
  }

  return function* watchGetDocumentsList() {
    yield fork(
      takeLatestAndCancel,
      actionType,
      `${actionType}_LIST_UNLOAD`,
      handleGetDocumentsList
    )
    yield fork(
      takeLatestAndCancel,
      `${actionType}_META`,
      `${actionType}_META_UNLOAD`,
      handleGetDocumentsMeta
    )
    yield fork(
      takeLatestAndCancel,
      `${actionType}_AUTOCOMPLETE_SEARCH`,
      `${actionType}_AUTOCOMPLETE_CLEAR`,
      handleGetDocumentsAutocomplete
    )
  }
}

export default makeDocuments
