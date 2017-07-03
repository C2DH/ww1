import {
  GET_THEMES_SUCCESS,
  GET_THEMES_LOADING,
  GET_THEMES_FAILURE,
  GET_THEMES_UNLOAD,
} from '../actions'

const defaultState = {
  loading: false,
  error: null,
  list: null
}

export default (prevState = defaultState, { type, payload, error }) => {
  switch (type) {
    case GET_THEMES_SUCCESS:
      return {
        ...prevState,
        loading: false,
        list: payload.results,
      }
    case GET_THEMES_FAILURE:
      return {
        ...prevState,
        loading: false,
        error,
      }
    case GET_THEMES_LOADING:
      return {
        ...prevState,
        loading: true,
        error: null,
      }
    case GET_THEMES_UNLOAD:
      return defaultState
    default:
      return prevState
  }
}
