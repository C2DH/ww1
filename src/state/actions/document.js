export const GET_DOCUMENT = 'GET_DOCUMENT'
export const GET_DOCUMENT_LOADING = 'GET_DOCUMENT_LOADING'
export const GET_DOCUMENT_SUCCESS = 'GET_DOCUMENT_SUCCESS'
export const GET_DOCUMENT_FAILURE = 'GET_DOCUMENT_FAILURE'
export const GET_DOCUMENT_UNLOAD = 'GET_DOCUMENT_UNLOAD'

export const loadDocument = (id) => ({
  type: GET_DOCUMENT,
  payload: id
})

export const unloadDocument = () => ({
  type: GET_DOCUMENT_UNLOAD,
})
