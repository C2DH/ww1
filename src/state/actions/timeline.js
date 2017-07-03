export const GET_TIMELINE_DOCUMENTS = 'GET_TIMELINE_DOCUMENTS'
export const GET_TIMELINE_DOCUMENTS_UNLOAD = 'GET_TIMELINE_DOCUMENTS_UNLOAD'

export const loadTimelineDocuments = () => ({
  type: GET_TIMELINE_DOCUMENTS,
  payload: {
    params: {},
    reset: true,
    crossFacets: false,
  }
})

export const unloadTimelineDocuments = () => ({
  type: GET_TIMELINE_DOCUMENTS_UNLOAD,
})
