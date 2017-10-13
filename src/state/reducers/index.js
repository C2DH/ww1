import { combineReducers } from 'redux'
import {i18nState} from "redux-i18n"
import document from './document'
import languages from './languages'
import settings from './settings'
import mapDocuments from './mapDocuments'
import timelineDocuments from './timelineDocuments'
import resourceDocuments from './resourceDocuments'
import collectionDocuments from './collectionDocuments'
import themes from './themes'
import themeDetail from './themeDetail'
import chapterDetail from './chapterDetail'
import staticStoryDetail from './staticStoryDetail'
import educationalDetail from './educationalDetail'
import educationals from './educationals'
import preview from './preview'
import scroll from './scroll'
import { reducer as tooltip } from 'redux-tooltip';

export default combineReducers({
  collectionDocuments,
  mapDocuments,
  timelineDocuments,
  resourceDocuments,
  themes,
  themeDetail,
  chapterDetail,
  staticStoryDetail,
  educationalDetail,
  educationals,
  document,
  languages,
  settings,
  i18nState,
  tooltip,
  preview,
  scroll,
})
