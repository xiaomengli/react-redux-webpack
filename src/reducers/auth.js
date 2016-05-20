import Immutable from 'immutable'
import actionTypes from '../constants/actionTypes'

const initialState = Immutable.fromJS({})

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_USER:
      return state
        .set('user', action.data ? Immutable.fromJS(action.data.user) : null)

    case actionTypes.CLEAR:
      return initialState
      
    default:
      return state
  }
}
