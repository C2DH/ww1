import { fork, put, call } from 'redux-saga/effects'
import { takeLatestAndCancel } from './effects/take'
import * as api from '../../api'
import makePaginateCollection from './hoc/paginateCollection'
import {
  GET_DOCUMENTS,
  GET_DOCUMENT,
  GET_DOCUMENT_LOADING,
  GET_DOCUMENT_SUCCESS,
  GET_DOCUMENT_FAILURE,
  GET_DOCUMENT_UNLOAD,
  GET_DOCUMENTS_META,
  GET_DOCUMENTS_META_LOADING,
  GET_DOCUMENTS_META_SUCCESS,
  GET_DOCUMENTS_META_FAILURE,
  GET_DOCUMENTS_META_UNLOAD,
  GET_MAP_DOCUMENTS,
  GET_TIMELINE_DOCUMENTS,
} from '../actions'

function *handleGetDocument({payload}) {
  yield put({ type: GET_DOCUMENT_LOADING })
  try {
    const doc = yield call(api.getDocument, payload)
    yield put({ type: GET_DOCUMENT_SUCCESS, payload: doc })
  } catch (error) {
    yield put({ type: GET_DOCUMENT_FAILURE, error })
  }
}

function *handleGetDocumentsMeta() {
  yield put({ type: GET_DOCUMENTS_META_LOADING })
  try {
    const docs = yield call(api.getDocuments, {
      facets: ['data__type', 'data__year'],
      exclude: JSON.stringify({ data__type__in: ['person', 'event', 'glossary', 'place'] })
    })
    yield put({ type: GET_DOCUMENTS_META_SUCCESS, payload: docs })
  } catch (error) {
    yield put({ type: GET_DOCUMENTS_META_FAILURE, error })
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
    GET_DOCUMENTS_META,
    GET_DOCUMENTS_META_UNLOAD,
    handleGetDocumentsMeta,
  )
  yield fork(makePaginateCollection(
    GET_MAP_DOCUMENTS,
    api.getMapDocuments,
    state => state.mapDocuments
  ))
  yield fork(
    takeLatestAndCancel,
    GET_DOCUMENT,
    GET_DOCUMENT_UNLOAD,
    handleGetDocument,
  )
  yield fork(makePaginateCollection(
    GET_TIMELINE_DOCUMENTS,
    api.getTimelineDocuments,
    state => state.timelineDocuments,
    1000
  ))
}
