import { SET_SCROLL_DELTA } from '../actions'

export default (prevState=0, {type, payload}) => {
  if(type === SET_SCROLL_DELTA){
    return payload
  }
  return prevState

}
