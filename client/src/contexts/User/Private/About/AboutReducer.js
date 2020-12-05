export default (state, action) => {
  switch(action.type) {
    case 'SET_ABOUTS':
      return {
        ...state,
        abouts: action.payload
      }
    case 'SET_CREATOR':
      return {
        ...state,
        creator: action.payload
      } 
    case 'ADD_ABOUT':
      return {
        ...state,
        abouts: [action.payload, ...state.abouts]
      }
    case 'DELETE_ABOUT':
      return {
        ...state,
        abouts: state.abouts.filter(about => about._id !== action.payload)
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