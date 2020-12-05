export default (state, action) => {
  switch(action.type) {
    case 'SET_USERFOOTERPUBLIC':
      return {
        ...state,
        userFooterPublic: action.payload
      }
    case 'SET_USERHOME':
      return {
        ...state,
        userHome: action.payload
      }
    case 'SET_USERABOUT':
      return {
        ...state,
        userAbout: action.payload
      }
    case 'SET_ERROR':
      return {
        ...state,
        status: action.payload.status,
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