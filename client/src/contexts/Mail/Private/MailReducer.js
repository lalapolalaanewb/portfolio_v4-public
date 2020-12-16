export default (state, action) => {
  switch(action.type) {
    case 'SET_MAILS':
      return {
        ...state,
        mails: action.payload
      }
    case 'SET_CONTACT':
      return {
        ...state,
        contact: action.payload
      }  
    case 'ADD_MAIL':
      return {
        ...state,
        mails: [action.payload, ...state.mails]
      }
    case 'DELETE_MAIL':
      return {
        ...state,
        mails: state.mails
            .filter(mail => mail._id !== action.payload)
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