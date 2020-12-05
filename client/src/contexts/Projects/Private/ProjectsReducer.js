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
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      }
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects
            .filter(project => project._id !== action.payload)
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