export default (state, action) => {
  switch(action.type) {
    case 'SET_SKILLS':
      return {
        ...state,
        skills: action.payload
      }
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [action.payload, ...state.skills]
      }
    case 'DELETE_SKILL':
      return {
        ...state,
        skills: state.skills
            .filter(skill => skill._id !== action.payload)
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