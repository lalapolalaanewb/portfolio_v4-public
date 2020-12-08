export default (state, action) => {
  switch(action.type) {
    case 'SET_RESUMES':
      return {
        ...state,
        resumes: action.payload
      }
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload
      }
    case 'SET_CREATOR':
      return {
        ...state,
        creator: action.payload
      } 
    case 'ADD_RESUME':
      return {
        ...state,
        resumes: [action.payload, ...state.resumes]
      }
    case 'DELETE_RESUME':
      return {
        ...state,
        resumes: state.resumes.filter(resume => resume._id !== action.payload)
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