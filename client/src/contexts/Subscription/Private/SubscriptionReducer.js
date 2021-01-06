export default (state, action) => {
  switch(action.type) {
    case 'SET_SUBS':
      return {
        ...state,
        subs: [ ...state.subs, ...action.payload ]
      }
    case 'ADD_SUB':
      return {
        ...state,
        subs: [action.payload, ...state.subs]
      }
    case 'DELETE_SUB':
      return {
        ...state,
        subs: state.subs
            .filter(sub => sub._id !== action.payload)
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