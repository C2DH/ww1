import { combineReducers } from 'redux'
import document from './document'
import settings from './settings'
import mapDocuments from './mapDocuments'
import timelineDocuments from './timelineDocuments'
import collectionDocuments from './collectionDocuments'
import themes from './themes'
import themeDetail from './themeDetail'

export default combineReducers({
  collectionDocuments,
  mapDocuments,
  timelineDocuments,
  themes,
  themeDetail,
  document,
  settings,
})
