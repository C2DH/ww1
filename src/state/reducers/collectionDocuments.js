import makeDocuments from './hor/documents'
import {
  GET_COLLECTION_DOCUMENTS,
  COLLECTION_DOCUMENTS_AUTOCOMPLETE_SET_TERM,
  COLLECTION_DOCUMENTS_AUTOCOMPLETE_SEARCH,
  COLLECTION_DOCUMENTS_AUTOCOMPLETE_SEARCH_LOADING,
  COLLECTION_DOCUMENTS_AUTOCOMPLETE_SEARCH_FAILURE,
  COLLECTION_DOCUMENTS_AUTOCOMPLETE_SEARCH_SUCCESS,
  COLLECTION_DOCUMENTS_AUTOCOMPLETE_CLEAR,
} from '../actions'

const defaultAutocompleteState = {
  loading: false,
  error: null,
  term: '',
  results: [],
}


const autocomplete = (prevState = defaultAutocompleteState, { type, payload, error }) => {
  switch (type) {
    case COLLECTION_DOCUMENTS_AUTOCOMPLETE_SEARCH:
    case COLLECTION_DOCUMENTS_AUTOCOMPLETE_SET_TERM:
      return {
        ...prevState,
        term: payload.term,
      }
    case COLLECTION_DOCUMENTS_AUTOCOMPLETE_SEARCH_LOADING:
      return {
        ...prevState,
        loading: true,
        error: null,
      }
    case COLLECTION_DOCUMENTS_AUTOCOMPLETE_SEARCH_FAILURE:
      return {
        ...prevState,
        loading: true,
        error,
      }
    case COLLECTION_DOCUMENTS_AUTOCOMPLETE_SEARCH_SUCCESS:
      return {
        ...prevState,
        loading: true,
        results: payload.results,
      }
    case COLLECTION_DOCUMENTS_AUTOCOMPLETE_CLEAR:
      return {
        ...prevState,
        loading: false,
        error: null,
        results: [],
      }
    default:
      return prevState
  }
}

export default makeDocuments(GET_COLLECTION_DOCUMENTS, {
  autocomplete,
})
