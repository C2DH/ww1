import makeDocuments from './hor/documents'
import {
  GET_TIMELINE_DOCUMENTS,
  TIMELINE_DOCUMENT_ENTER_VIEWPORT,
  TIMELINE_DOCUMENT_LEAVE_VIEWPORT,
} from '../actions'

const visibleDocuments = (prevState = {}, { type, payload }) => {
  switch (type) {
    case TIMELINE_DOCUMENT_ENTER_VIEWPORT:
      return {
        ...prevState,
        [payload]: true
      }
    case TIMELINE_DOCUMENT_LEAVE_VIEWPORT:
      return {
        ...prevState,
        [payload]: undefined,
      }
    default:
      return prevState
  }
}

export default makeDocuments(GET_TIMELINE_DOCUMENTS, {
  visibleDocuments,
})
