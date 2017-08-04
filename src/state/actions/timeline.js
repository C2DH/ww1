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

export const TIMELINE_DOCUMENT_ENTER_VIEWPORT = 'TIMELINE_DOCUMENT_ENTER_VIEWPORT'
export const timelineDocumentEnterViewport = (doc) => ({
  type: TIMELINE_DOCUMENT_ENTER_VIEWPORT,
  payload: doc,
})

export const TIMELINE_DOCUMENT_LEAVE_VIEWPORT = 'TIMELINE_DOCUMENT_LEAVE_VIEWPORT'
export const timelineDocumentLeaveViewport = (doc) => ({
  type: TIMELINE_DOCUMENT_LEAVE_VIEWPORT,
  payload: doc,
})
