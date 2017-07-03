import { some } from 'lodash'
import { arrayze } from '../../utils'

// Hight Order Reducer for reset a piece of state on certain actions
const resetOn = (matchTypes, reducer) => {
  // Match fn
  const match = action =>
    some(arrayze(matchTypes), matchType => {
      // TODO: Implement more option for matching type from outside!
      return matchType === action.type
    })

  return (previousState, action) => {
    // Match action! Reset this piece of state
    if (match(action)) {
      return reducer(undefined, action)
    }
    return reducer(previousState, action)
  }
}

export default resetOn
