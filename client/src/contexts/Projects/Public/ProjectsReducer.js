export default (state, action) => {
  switch(action.type) {
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload
      }
    case 'SET_TECHLIST':
      return {
        ...state,
        techList: action.payload
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