export default (state, action) => {
  switch(action.type) {
    case 'SET_DASHBOARD':
      return {
        ...state,
        dashboard: { total: action.payload.total, user: action.payload.user }
      }
    case 'SET_SUCCESS':
      return {
        ...state,
        success: action.payload.status,
        message: action.payload.message
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload.status,
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