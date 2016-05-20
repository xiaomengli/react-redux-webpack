export default function fallbackActionType ({ getState }) {
  return (nextMiddleWare) => (action) => {
    if(!action.type){
      action.type = "MY_DEFAULT_ACTION_TYPE"
    }
    
    return nextMiddleWare(action)
  }
}