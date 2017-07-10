import { fork, put, call } from 'redux-saga/effects'
import { takeLatestAndCancel } from './effects/take'
import * as api from '../../api'
import makeDocuments from './hos/documents'
import {
  GET_COLLECTION_DOCUMENTS,
  GET_MAP_DOCUMENTS,
  GET_TIMELINE_DOCUMENTS,
  GET_DOCUMENT,
  GET_DOCUMENT_LOADING,
  GET_DOCUMENT_SUCCESS,
  GET_DOCUMENT_FAILURE,
  GET_DOCUMENT_UNLOAD,
  GET_THEMES,
  GET_THEMES_LOADING,
  GET_THEMES_SUCCESS,
  GET_THEMES_FAILURE,
  GET_THEMES_UNLOAD,
  GET_THEME,
  GET_THEME_SUCCESS,
  GET_THEME_LOADING,
  GET_THEME_FAILURE,
  GET_THEME_UNLOAD,
} from '../actions'

const BIG_PAGE_SIZE = 1000

function *handleGetDocument({ payload }) {
  yield put({ type: GET_DOCUMENT_LOADING })
  try {
    const doc = yield call(api.getDocument, payload)
    yield put({ type: GET_DOCUMENT_SUCCESS, payload: doc })
  } catch (error) {
    yield put({ type: GET_DOCUMENT_FAILURE, error })
  }
}

function *handleGetThemes() {
  yield put({ type: GET_THEMES_LOADING })
  try {
    const { results } = yield call(api.getThemes)
    yield put({ type: GET_THEMES_SUCCESS, payload: { results } })
  } catch (error) {
    yield put({ type: GET_THEMES_FAILURE, error })
  }
}

function *handleGetTheme({ payload }) {
  const themeIdOrSlug = payload
  yield put({ type: GET_THEME_LOADING })
  try {
    const theme = yield call(api.getTheme, themeIdOrSlug)
    yield put({ type: GET_THEME_SUCCESS, payload: theme })
  } catch (error) {
    yield put({ type: GET_THEME_FAILURE, error })
  }
}

export default function* rootSaga() {
  yield fork(
    takeLatestAndCancel,
    GET_DOCUMENT,
    GET_DOCUMENT_UNLOAD,
    handleGetDocument,
  )
  yield fork(
    takeLatestAndCancel,
    GET_THEME,
    GET_THEME_UNLOAD,
    handleGetTheme,
  )
  yield fork(
    takeLatestAndCancel,
    GET_THEMES,
    GET_THEMES_UNLOAD,
    handleGetThemes,
  )
  yield fork(makeDocuments(
    GET_COLLECTION_DOCUMENTS,
    api.getCollectionDocuments,
    state => state.collectionDocuments,
  ))
  yield fork(makeDocuments(
    GET_TIMELINE_DOCUMENTS,
    api.getTimelineDocuments,
    state => state.timelineDocuments,
    BIG_PAGE_SIZE,
  ))
  yield fork(makeDocuments(
    GET_MAP_DOCUMENTS,
    api.getMapDocuments,
    state => state.mapDocuments,
    BIG_PAGE_SIZE,
  ))
}
