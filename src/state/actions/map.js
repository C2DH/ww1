export const GET_MAP_DOCUMENTS = 'GET_MAP_DOCUMENTS'
export const GET_MAP_DOCUMENTS_UNLOAD = 'GET_MAP_DOCUMENTS_UNLOAD'

export const loadMapDocuments = (params = {}) => ({
  type: GET_MAP_DOCUMENTS,
  payload: {
    params,
    crossFacets: true,
    reset: true,
  }
})

export const unloadMapDocuments = () => ({
  type: GET_MAP_DOCUMENTS_UNLOAD,
})
