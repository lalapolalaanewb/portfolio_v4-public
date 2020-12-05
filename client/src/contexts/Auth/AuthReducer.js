export default (state, action) => {
  switch(action.type) {
      case 'SET_ISAUTHENTICATED':
        return {
          ... state,
          authenticated: action.payload
        }
      case 'SET_ERROR':
        return {
          ...state,
          error: action.payload.error,
          message: action.payload.message
        }
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload
        }
      default:
        return state
  }
}