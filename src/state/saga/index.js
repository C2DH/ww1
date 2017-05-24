import { fork, put, call } from 'redux-saga/effects'
import { takeLatestAndCancel } from './effects/take'
import * as api from '../../api'
import makePaginateCollection from './hoc/paginateCollection'
import { GET_DOCUMENTS, GET_DOCUMENT, GET_DOCUMENT_LOADING, GET_DOCUMENT_SUCCESS, GET_DOCUMENT_FAILURE, GET_DOCUMENT_UNLOAD } from '../actions'

function *handleGetDocument({payload}) {
  yield put({ type: GET_DOCUMENT_LOADING })
  try {
    const doc = yield call(api.getDocument, payload)
    yield put({ type: GET_DOCUMENT_SUCCESS, payload: doc })
  } catch (error) {
    yield put({ type: GET_DOCUMENT_FAILURE, error })
  }
}

export default function* rootSaga() {
  yield fork(makePaginateCollection(
    GET_DOCUMENTS,
    api.getDocuments,
    state => state.documents
  ))
  yield fork(
    takeLatestAndCancel,
    GET_DOCUMENT,
    GET_DOCUMENT_UNLOAD,
    handleGetDocument,
  )
}
