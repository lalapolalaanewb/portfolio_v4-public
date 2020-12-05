export default (state, action) => {
  switch(action.type) {
    case 'SET_SOCIALS':
      return {
        ...state,
        socials: action.payload
      }
    case 'SET_CREATOR':
      return {
        ...state,
        creator: action.payload
      } 
    case 'ADD_SOCIAL':
      return {
        ...state,
        socials: [action.payload, ...state.socials]
      }
    case 'DELETE_SOCIAL':
      return {
        ...state,
        socials: state.socials.filter(social => social._id !== action.payload)
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