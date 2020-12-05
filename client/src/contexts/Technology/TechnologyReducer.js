export default (state, action) => {
  switch(action.type) {
    case 'SET_TECHS':
      return {
        ...state,
        techs: action.payload
      }
    case 'ADD_TECH':
      return {
        ...state,
        techs: [action.payload, ...state.techs]
      }
    case 'DELETE_TECH':
      return {
        ...state,
        techs: state.techs
            .filter(tech => tech._id !== action.payload)
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