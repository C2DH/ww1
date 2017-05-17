import { combineReducers } from 'redux'
import documents from './documents'
import settings from './settings'

export default combineReducers({
  documents,
  settings,
})
