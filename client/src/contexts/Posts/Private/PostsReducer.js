export default (state, action) => {
  switch(action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload
      }
    case 'SET_TECHLIST':
      return {
        ...state,
        techList: action.payload
      }
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts
            .filter(post => post._id !== action.payload)
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