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
