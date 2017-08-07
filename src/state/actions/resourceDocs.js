export const GET_RESOURCE_DOCUMENTS = 'GET_RESOURCE_DOCUMENTS'
export const GET_RESOURCE_DOCUMENTS_UNLOAD = 'GET_RESOURCE_DOCUMENTS_UNLOAD'

export const loadResourceDocuments = (params = {}) => ({
  type: GET_RESOURCE_DOCUMENTS,
  payload: {
    params,
    crossFacets: false,
    reset: true,
  }
})

export const unloadResourceDocuments = () => ({
  type: GET_RESOURCE_DOCUMENTS_UNLOAD,
})
