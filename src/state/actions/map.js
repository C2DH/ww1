export const GET_MAP_DOCUMENTS = 'GET_MAP_DOCUMENTS'
export const GET_MAP_DOCUMENTS_UNLOAD = 'GET_MAP_DOCUMENTS_UNLOAD'
export const GET_MAP_DOCUMENTS_LIST_UNLOAD = 'GET_MAP_DOCUMENTS_LIST_UNLOAD'

export const loadMapDocuments = (params = {}) => ({
  type: GET_MAP_DOCUMENTS,
  payload: {
    params,
    crossFacets: true,
    reset: true,
  }
})

export const unloadMapDocumentsList = () => ({
  type: GET_MAP_DOCUMENTS_LIST_UNLOAD,
})

export const GET_MAP_DOCUMENTS_META = 'GET_MAP_DOCUMENTS_META'
export const GET_MAP_DOCUMENTS_META_UNLOAD = 'GET_MAP_DOCUMENTS_META_UNLOAD'

export const loadMapDocumentsMeta = () => ({
  type: GET_MAP_DOCUMENTS_META,
})

export const unloadMapDocumentsMeta = () => ({
  type: GET_MAP_DOCUMENTS_META_UNLOAD,
})

export const unloadMapDocuments = () => ({
  type: GET_MAP_DOCUMENTS_UNLOAD,
})

// Autocomplete

export const GET_MAP_DOCUMENTS_AUTOCOMPLETE_SET_TERM = 'GET_MAP_DOCUMENTS_AUTOCOMPLETE_SET_TERM'
export const autocompleteMapSetTerm = (term) => ({
  type: GET_MAP_DOCUMENTS_AUTOCOMPLETE_SET_TERM,
  payload: { term }
})

export const GET_MAP_DOCUMENTS_AUTOCOMPLETE_SEARCH = 'GET_MAP_DOCUMENTS_AUTOCOMPLETE_SEARCH'
export const autocompleteMapSearch = (term) => ({
  type: GET_MAP_DOCUMENTS_AUTOCOMPLETE_SEARCH,
  payload: { term }
})

export const GET_MAP_DOCUMENTS_AUTOCOMPLETE_CLEAR = 'GET_MAP_DOCUMENTS_AUTOCOMPLETE_CLEAR'
export const autocompleteMapClear = () => ({
  type: GET_MAP_DOCUMENTS_AUTOCOMPLETE_CLEAR,
})
