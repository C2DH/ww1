import { combineReducers } from 'redux'
import paginateCollection from './hoc/paginateCollection'
import {
  GET_DOCUMENTS,
  GET_DOCUMENTS_META_SUCCESS,
  GET_DOCUMENTS_META_UNLOAD,
} from '../actions'

const docsCollection = paginateCollection(GET_DOCUMENTS)

const docsFacets = (prevState = {}, { type, payload }) => {
  switch (type) {
    case GET_DOCUMENTS_META_SUCCESS:
      return payload.facets
    case GET_DOCUMENTS_META_UNLOAD:
      return {}
    default:
      return prevState
  }
}

const docsTotalCount = (prevState = null, { type, payload }) => {
  switch (type) {
    case GET_DOCUMENTS_META_SUCCESS:
      return payload.count
    case GET_DOCUMENTS_META_UNLOAD:
      return null
    default:
      return prevState
  }
}

export default combineReducers({
  collection: docsCollection,
  facets: docsFacets,
  totalCount: docsTotalCount,
})
