import { GET_DOCUMENT_LOADING, GET_DOCUMENT_SUCCESS, GET_DOCUMENT_FAILURE, GET_DOCUMENT_UNLOAD } from '../actions'

const defaultState = {
  loading : false,
  error : null,
  data: null,
}

export default (prevState=defaultState, { type, payload, error }) => {
  switch (type) {
    case GET_DOCUMENT_LOADING:
      return { ...prevState, loading: true, error: null }

    case GET_DOCUMENT_FAILURE:
      return { ...prevState, loading: false, error }

    case GET_DOCUMENT_SUCCESS:
      return { ...prevState, loading: false, error: null, data: payload }

    case GET_DOCUMENT_UNLOAD:
      return defaultState

    default:
      return prevState

  }
}
