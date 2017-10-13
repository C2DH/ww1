import {
  GET_EDUCATIONALS_SUCCESS,
  GET_EDUCATIONALS_LOADING,
  GET_EDUCATIONALS_FAILURE,
  GET_EDUCATIONALS_UNLOAD,
} from '../actions'

const defaultState = {
  loading: false,
  error: null,
  list: null
}

export default (prevState = defaultState, { type, payload, error }) => {
  switch (type) {
    case GET_EDUCATIONALS_SUCCESS:
      return {
        ...prevState,
        loading: false,
        list: payload.results,
      }
    case GET_EDUCATIONALS_FAILURE:
      return {
        ...prevState,
        loading: false,
        error,
      }
    case GET_EDUCATIONALS_LOADING:
      return {
        ...prevState,
        loading: true,
        error: null,
      }
    case GET_EDUCATIONALS_UNLOAD:
      return defaultState
    default:
      return prevState
  }
}
