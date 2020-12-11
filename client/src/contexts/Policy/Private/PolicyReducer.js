export default (state, action) => {
  switch(action.type) {
    case 'SET_POLICIES':
      return {
        ...state,
        policies: action.payload
      }
    case 'ADD_POLICY':
      return {
        ...state,
        policies: [action.payload, ...state.policies]
      }
    case 'DELETE_POLICY':
      return {
        ...state,
        policies: state.policies.filter(policy => policy._id !== action.payload)
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