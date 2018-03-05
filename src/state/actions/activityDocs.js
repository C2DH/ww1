export const GET_ACTIVITY_DOCUMENTS = 'GET_ACTIVITY_DOCUMENTS'
export const GET_ACTIVITY_DOCUMENTS_UNLOAD = 'GET_ACTIVITY_DOCUMENTS_UNLOAD'

export const loadActivityDocuments = (params = {}) => ({
  type: GET_ACTIVITY_DOCUMENTS,
  payload: {
    params,
    crossFacets: false,
    reset: true,
  }
})

export const unloadActivityDocuments = () => ({
  type: GET_ACTIVITY_DOCUMENTS_UNLOAD,
})
