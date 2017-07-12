import {
  GET_CHAPTER_SUCCESS,
  GET_CHAPTER_LOADING,
  GET_CHAPTER_FAILURE,
  GET_CHAPTER_UNLOAD,
} from '../actions'

const defaultState = {
  data: null,
  loading: false,
  error: null,
}

export default (prevState = defaultState, { type, payload, error }) => {
  switch (type) {
    case GET_CHAPTER_SUCCESS:
      return {
        ...prevState,
        loading: false,
        data: payload,
      }
    case GET_CHAPTER_LOADING:
      return {
        ...prevState,
        loading: true,
        error: null,
      }
    case GET_CHAPTER_FAILURE:
      return {
        ...prevState,
        error,
        loading: false,
      }
    case GET_CHAPTER_UNLOAD:
      return defaultState
    default:
      return prevState
  }
}
