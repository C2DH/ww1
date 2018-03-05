import { race, fork, put, call, take, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { takeLatestAndCancel } from './effects/take'
import * as api from '../../api'
import makeDocuments from './hos/documents'
import { parseQsValue } from '../../utils'
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
  GET_CHAPTER,
  GET_CHAPTER_SUCCESS,
  GET_CHAPTER_LOADING,
  GET_CHAPTER_FAILURE,
  GET_CHAPTER_UNLOAD,
  GET_STATIC_STORY,
  GET_STATIC_STORY_SUCCESS,
  GET_STATIC_STORY_LOADING,
  GET_STATIC_STORY_FAILURE,
  GET_STATIC_STORY_UNLOAD,
  GET_EDUCATIONAL,
  GET_EDUCATIONAL_SUCCESS,
  GET_EDUCATIONAL_LOADING,
  GET_EDUCATIONAL_FAILURE,
  GET_EDUCATIONAL_UNLOAD,
  GET_EDUCATIONALS,
  GET_EDUCATIONALS_LOADING,
  GET_EDUCATIONALS_SUCCESS,
  GET_EDUCATIONALS_FAILURE,
  GET_EDUCATIONALS_UNLOAD,
  GET_RESOURCE_DOCUMENTS,
  GET_ACTIVITY_DOCUMENTS,
  UPDATE_SETTINGS,
  SET_PREVIEW_TOKEN,
  LOCK_SCROLL,
  UNLOCK_SCROLL,
} from '../actions'

import { getCurrentLanguage } from '../selectors'

import {setLanguage} from "redux-i18n"

const BIG_PAGE_SIZE = 1000

// Path call inject preview auth token as last call args when exist
function *callPreview(...args) {
  const previewAuthToken = yield select(state => state.preview.token)
  const callArgs = previewAuthToken ? args.concat(previewAuthToken) : args
  return yield call(...callArgs)
}

function *handleGetDocument({ payload }) {
  yield put({ type: GET_DOCUMENT_LOADING })
  try {
    const doc = yield call(api.getDocument, payload)
    yield put({ type: GET_DOCUMENT_SUCCESS, payload: doc })
  } catch (error) {
    yield put({ type: GET_DOCUMENT_FAILURE, error })
  }
}

function *handleGetStaticStory({ payload }) {
  yield put({ type: GET_STATIC_STORY_LOADING })
  try {
    const story = yield call(api.getStaticStory, payload)
    yield put({ type: GET_STATIC_STORY_SUCCESS, payload: story })
  } catch (error) {
    yield put({ type: GET_STATIC_STORY_FAILURE, error })
  }
}

function *handleGetThemes() {
  yield put({ type: GET_THEMES_LOADING })
  try {
    const { results } = yield callPreview(api.getThemes)
    yield put({ type: GET_THEMES_SUCCESS, payload: { results } })
  } catch (error) {
    yield put({ type: GET_THEMES_FAILURE, error })
  }
}

function *handleGetTheme({ payload }) {
  const themeIdOrSlug = payload
  yield put({ type: GET_THEME_LOADING })
  try {
    const theme = yield callPreview(api.getTheme, themeIdOrSlug)
    yield put({ type: GET_THEME_SUCCESS, payload: theme })
  } catch (error) {
    yield put({ type: GET_THEME_FAILURE, error })
  }
}

function *handleGetChapter({ payload }) {
  const chapterIdOrSlug = payload
  yield put({ type: GET_CHAPTER_LOADING })
  try {
    const chapter = yield callPreview(api.getChapter, chapterIdOrSlug)
    yield put({ type: GET_CHAPTER_SUCCESS, payload: chapter })
  } catch (error) {
    yield put({ type: GET_CHAPTER_FAILURE, error })
  }
}

function *handleGetEducationals() {
  yield put({ type: GET_EDUCATIONALS_LOADING })
  try {
    const { results } = yield callPreview(api.getEducationals)
    yield put({ type: GET_EDUCATIONALS_SUCCESS, payload: { results } })
  } catch (error) {
    yield put({ type: GET_EDUCATIONALS_FAILURE, error })
  }
}

function *handleGetEducational({ payload }) {
  const eduIdOrSlug = payload
  yield put({ type: GET_EDUCATIONAL_LOADING })
  try {
    const edu = yield callPreview(api.getEducational, eduIdOrSlug)
    yield put({ type: GET_EDUCATIONAL_SUCCESS, payload: edu })
  } catch (error) {
    yield put({ type: GET_EDUCATIONAL_FAILURE, error })
  }
}


function *watchLanguage() {

  while(true) {
    const { payload } = yield take(UPDATE_SETTINGS)
    if(payload.language){
      yield put(setLanguage(payload.language))
    }
  }
}

function* preview() {
  const token = parseQsValue(window.location, '_t')
  if (token) {
    yield put({ type: SET_PREVIEW_TOKEN, payload: token })
  }
}

function* scrollLockSaga() {
  let time = 0
  const { payload } = yield take(LOCK_SCROLL)
  time = payload.time

  while (true) {
    // When not time promise an unresolved promise :D
    const myDelay = time ? delay : () => new Promise(() => {})
    const { timeout, lock } = yield race({
      timeout: call(myDelay, time),
      lock: take(LOCK_SCROLL)
    })

    if (timeout) {
      yield put({ type: UNLOCK_SCROLL })
      const { payload } = yield take(LOCK_SCROLL)
      time = payload.time
    } else {
      time = lock.payload.time
    }
  }
}

export default function* rootSaga() {
  yield fork(preview)
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
    GET_STATIC_STORY,
    GET_STATIC_STORY_UNLOAD,
    handleGetStaticStory,
  )
  yield fork(
    takeLatestAndCancel,
    GET_EDUCATIONAL,
    GET_EDUCATIONAL_UNLOAD,
    handleGetEducational,
  )
  yield fork(
    takeLatestAndCancel,
    GET_CHAPTER,
    GET_CHAPTER_UNLOAD,
    handleGetChapter,
  )
  yield fork(
    takeLatestAndCancel,
    GET_THEMES,
    GET_THEMES_UNLOAD,
    handleGetThemes,
  )
  yield fork(
    takeLatestAndCancel,
    GET_EDUCATIONALS,
    GET_EDUCATIONALS_UNLOAD,
    handleGetEducationals,
  )
  yield fork(makeDocuments(
    GET_COLLECTION_DOCUMENTS,
    api.getCollectionDocuments,
    state => state.collectionDocuments,
    {
      data__type: [
        'filters.data__type__in',
      ],
      data__year: [
        'exclude.data__year__iexact',
        'overlaps',
      ],
    }
  ))
  yield fork(makeDocuments(
    GET_TIMELINE_DOCUMENTS,
    api.getTimelineDocuments,
    state => state.timelineDocuments,
    null,
    BIG_PAGE_SIZE,
  ))
  yield fork(makeDocuments(
    GET_RESOURCE_DOCUMENTS,
    api.getResourceDocuments,
    state => state.resourceDocuments,
    null,
    BIG_PAGE_SIZE,
  ))
  yield fork(makeDocuments(
    GET_ACTIVITY_DOCUMENTS,
    api.getActivityDocuments,
    state => state.activityDocuments,
    null,
    BIG_PAGE_SIZE,
  ))
  yield fork(makeDocuments(
    GET_MAP_DOCUMENTS,
    api.getMapDocuments,
    state => state.mapDocuments,
    {
      data__place_type: [
        'filters.data__place_type__in'
      ],
      data__year: [
        'exclude.data__year__iexact',
        'overlaps',
      ],
    },
    BIG_PAGE_SIZE,
  ))

  yield fork(watchLanguage)
  yield fork(scrollLockSaga)

}
