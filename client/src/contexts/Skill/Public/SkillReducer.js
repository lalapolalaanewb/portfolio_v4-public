export default (state, action) => {
  switch(action.type) {
    case 'SET_SKILLS':
      return {
        ...state,
        skills: action.payload
      }
    case 'SET_TECHLIST':
      return {
        ...state,
        techList: action.payload
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