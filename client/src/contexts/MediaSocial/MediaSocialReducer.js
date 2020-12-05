export default (state, action) => {
  switch(action.type) {
    case 'SET_MEDIASOCIALS':
      return {
        ...state,
        mediaSocials: action.payload
      }
    case 'ADD_MEDIASOCIAL':
      return {
        ...state,
        mediaSocials: [action.payload, ...state.mediaSocials]
      }
    case 'DELETE_MEDIASOCIAL':
      return {
        ...state,
        mediaSocials: state.mediaSocials
            .filter(mediaSocial => mediaSocial._id !== action.payload)
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