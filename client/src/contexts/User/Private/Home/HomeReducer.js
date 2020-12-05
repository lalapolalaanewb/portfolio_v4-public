export default (state, action) => {
  switch(action.type) {
    case 'SET_HOMES':
      return {
        ...state,
        homes: action.payload
      }
    case 'SET_CREATOR':
      return {
        ...state,
        creator: action.payload
      } 
    case 'ADD_HOME':
      return {
        ...state,
        homes: [action.payload, ...state.homes]
      }
    case 'DELETE_HOME':
      return {
        ...state,
        homes: state.homes.filter(home => home._id !== action.payload)
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