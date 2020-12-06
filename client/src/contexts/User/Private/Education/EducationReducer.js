export default (state, action) => {
  switch(action.type) {
    case 'SET_EDUS':
      return {
        ...state,
        edus: action.payload
      }
    case 'SET_CREATOR':
      return {
        ...state,
        creator: action.payload
      } 
    case 'ADD_EDU':
      return {
        ...state,
        edus: [action.payload, ...state.edus]
      }
    case 'DELETE_EDU':
      return {
        ...state,
        edus: state.edus.filter(edu => edu._id !== action.payload)
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