import {
  UPDATE_SETTINGS,
} from '../actions'

const defaultState = {
  // ...
  language: 'en_US',
  // ...
}

export default (prevState = defaultState, { type, payload }) => {
  switch (type) {
    case UPDATE_SETTINGS:
      return {
        ...prevState,
        ...payload,
      }
    default:
      return prevState
  }
}
