export default (state, action) => {
  switch(action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      }
    case 'ADD_USER':
      return {
        ...state,
        users: [action.payload, ...state.users]
      }
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users
            .filter(user => user._id !== action.payload)
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