import { put, select, fork, call } from 'redux-saga/effects'
import { identity } from 'lodash'
import qs from 'query-string'
import { takeLatestAndCancel } from '../effects/take'

export const DEFAULT_PAGE_SIZE = 50

// Saga for a generic paginated collection
const makePaginateCollection = (
  actionType,
  apiFn,
  selectState,
  pageSize = DEFAULT_PAGE_SIZE,
  transform = identity,
) => {
  function* handleGetPaginatedList({ payload: { params, reset } }) {
    yield put({ type: `${actionType}_LOADING` })
    try {
      const offset = reset
        ? 0
        : yield select(state => selectState(state).pagination.offset)
      const { results, next, count } = yield call(apiFn, {
        ...params,
        limit: pageSize,
        offset,
      })
      const nextOffset = next ? +qs.parse(qs.extract(next)).offset : null
      yield put({
        type: `${actionType}_SUCCESS`,
        payload: {
          results: transform(results),
          offset: nextOffset,
          count,
          reset,
        },
      })
    } catch (error) {
      yield put({ type: `${actionType}_FAILURE`, error })
    }
  }

  return function* watchGetPaginatedList() {
    yield fork(
      takeLatestAndCancel,
      actionType,
      `${actionType}_UNLOAD`,
      handleGetPaginatedList
    )
  }
}

export default makePaginateCollection
