import { combineReducers } from 'redux'
import documents from './documents'
import document from './document'
import settings from './settings'

export default combineReducers({
  documents,
  document,
  settings,
})
