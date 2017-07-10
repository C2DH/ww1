import {
  GET_THEME_SUCCESS,
  GET_THEME_LOADING,
  GET_THEME_FAILURE,
  GET_THEME_UNLOAD,
} from '../actions'

const defaultState = {
  data: null,
  loading: false,
  error: null,
}

export default (prevState = defaultState, { type, payload, error }) => {
  switch (type) {
    case GET_THEME_SUCCESS:
      return {
        ...prevState,
        loading: false,
        data: payload,
      }
    case GET_THEME_LOADING:
      return {
        ...prevState,
        loading: true,
        error: null,
      }
    case GET_THEME_FAILURE:
      return {
        ...prevState,
        error,
        loading: false,
      }
    case GET_THEME_UNLOAD:
      return defaultState
    default:
      return prevState
  }
}
