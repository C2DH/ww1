import { combineReducers } from 'redux'
import documents from './documents'
import document from './document'
import settings from './settings'
import mapDocuments from './mapDocuments'
import timelineDocuments from './timelineDocuments'

export default combineReducers({
  documents,
  mapDocuments,
  timelineDocuments,
  document,
  settings,
})
