import { combineReducers } from 'redux'
import document from './document'
import settings from './settings'
import mapDocuments from './mapDocuments'
import timelineDocuments from './timelineDocuments'
import collectionDocuments from './collectionDocuments'

export default combineReducers({
  collectionDocuments,
  mapDocuments,
  timelineDocuments,
  document,
  settings,
})
