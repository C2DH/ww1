import { combineReducers } from 'redux'
import { uniq } from 'lodash'
import { normalizeCollection } from '../../utils'
import resetOn from './resetOn'

const makeDocumentsList = (actionType) => {

  const defaultState = {
    loading: false,
    error: null,
    // null instead of [] to discriminating the inital state by the empy state
    ids: null,
    data: {},
    pagination: {
      count: null,
      offset: 0,
    },
    // Facets related to current data
    facets: {},
  }

  const reducer = (prevState = defaultState, { type, payload, error }) => {
    switch (type) {
      case `${actionType}_SUCCESS`: {
        const { reset, results, count, offset, facets } = payload
        const fresh = normalizeCollection(results, 'id')

        return {
          ...prevState,
          loading: false,
          ids: reset ? fresh.ids : uniq(prevState.ids.concat(fresh.ids)),
          data: reset ? fresh.data : { ...prevState.data, ...fresh.data },
          pagination: {
            count,
            offset,
          },
          facets,
        }
      }
      case `${actionType}_LOADING`:
        return {
          ...prevState,
          loading: true,
          error: null,
        }
      case `${actionType}_FAILURE`:
        return {
          ...prevState,
          loading: false,
          error,
        }
      // Reset only the piece of state related to data
      // keep count and other shitty to old value
      case `${actionType}_LIST_UNLOAD`:
        return {
          ...prevState,
          loading: false,
          error: null,
          ids: null,
          data: {},
        }
      default:
        return prevState
    }
  }

  return reducer
}

const makeDocumentsMeta = (actionType) => {

  const defaultState = {
    loading: false,
    error: null,
    facets: {},
    count: null,
  }

  const reducer = (prevState = defaultState, { type, payload, error }) => {
    switch (type) {
      case `${actionType}_META_SUCCESS`:
        return {
          ...prevState,
          loading: false,
          facets: payload.facets,
          count: payload.count,
        }
      case `${actionType}_META_LOADING`:
        return {
          ...prevState,
          loading: true,
          error: null,
        }
      case `${actionType}_META_FAILURE`:
        return {
          ...prevState,
          error,
          loading: false,
        }
      default:
        return prevState
    }
  }

  return reducer
}

export default (actionType) => {
  return resetOn(`${actionType}_UNLOAD` ,combineReducers({
    list: makeDocumentsList(actionType),
    meta: resetOn(`${actionType}_META_UNLOAD`, makeDocumentsMeta(actionType)),
  }))
}
