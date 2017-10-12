import {
  GET_EDUCATIONAL_SUCCESS,
  GET_EDUCATIONAL_LOADING,
  GET_EDUCATIONAL_FAILURE,
  GET_EDUCATIONAL_UNLOAD,
} from '../actions'

const defaultState = {
  data: null,
  loading: false,
  error: null,
}

export default (prevState = defaultState, { type, payload, error }) => {
  switch (type) {
    case GET_EDUCATIONAL_SUCCESS:
      return {
        ...prevState,
        loading: false,
        data: payload,
      }
    case GET_EDUCATIONAL_LOADING:
      return {
        ...prevState,
        loading: true,
        error: null,
      }
    case GET_EDUCATIONAL_FAILURE:
      return {
        ...prevState,
        error,
        loading: false,
      }
    case GET_EDUCATIONAL_UNLOAD:
      return defaultState
    default:
      return prevState
  }
}
