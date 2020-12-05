export default (state, action) => {
  switch(action.type) {
    case 'SET_COMMENTS':
      return {
        ...state,
        comments: action.payload
      }
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      }
    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(comment => comment._id !== action.payload)
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