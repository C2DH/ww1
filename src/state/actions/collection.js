export const GET_COLLECTION_DOCUMENTS = 'GET_COLLECTION_DOCUMENTS'
export const GET_COLLECTION_DOCUMENTS_UNLOAD = 'GET_COLLECTION_DOCUMENTS_UNLOAD'

export const loadCollectionDocuments = (params = {}) => ({
  type: GET_COLLECTION_DOCUMENTS,
  payload: {
    params,
    crossFacets: true,
    reset: true,
  }
})

export const loadMoreCollectionDocuments = (params = {}) => ({
  type: GET_COLLECTION_DOCUMENTS,
  payload: {
    params,
    crossFacets: false,
    reset: false,
  }
})

export const unloadCollectionDocuments = () => ({
  type: GET_COLLECTION_DOCUMENTS_UNLOAD,
})

export const GET_COLLECTION_DOCUMENTS_META = 'GET_COLLECTION_DOCUMENTS_META'
export const GET_COLLECTION_DOCUMENTS_META_UNLOAD = 'GET_COLLECTION_DOCUMENTS_META_UNLOAD'

export const loadCollectionDocumentsMeta = () => ({
  type: GET_COLLECTION_DOCUMENTS_META,
})
export const unloadCollectionDocumentsMeta = () => ({
  type: GET_COLLECTION_DOCUMENTS_META_UNLOAD,
})
