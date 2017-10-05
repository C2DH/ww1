import {
  SET_PREVIEW_TOKEN,
  CLEAR_PREVIEW_TOKEN,
} from '../actions'

export default (prevState = { token: null }, { type, payload }) => {
  switch (type) {
    case SET_PREVIEW_TOKEN:
      return {
        ...prevState,
        token: payload,
      }
    case CLEAR_PREVIEW_TOKEN:
      return {
        ...prevState,
        token: null,
      }
    default:
      return prevState
  }
}
