import { combineReducers } from 'redux'
import documents from './documents'
import document from './document'
import settings from './settings'
import mapDocuments from './mapDocuments'

export default combineReducers({
  documents,
  mapDocuments,
  document,
  settings,
})
