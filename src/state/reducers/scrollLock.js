import { LOCK_SCROLL, UNLOCK_SCROLL } from '../actions'

export default (prevState = false, { type, payload }) => {
  switch (type) {
    case LOCK_SCROLL:
      return true
    case UNLOCK_SCROLL:
      return false
    default:
      return prevState
  }
}
