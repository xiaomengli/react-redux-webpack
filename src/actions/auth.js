import actionTypes from '../constants/actionTypes'
import fetchHelper from '../middlewares/fetchHelper'

export function fetchUser() {
  return (dispatch, getState) => (
    fetchHelper({requestPath: 'current_user'}, dispatch)
      .then(() => {
        dispatch({
          type: actionTypes.SET_USER,
          data
        })

        return Promise.resolve()
      })
      .catch(err => {
        switch(err.type) {
          case 401:
          default:
            dispatch({
              type: actionTypes.CLEAR
            })
            return
        }

        return Promise.reject()
      })
  )
}