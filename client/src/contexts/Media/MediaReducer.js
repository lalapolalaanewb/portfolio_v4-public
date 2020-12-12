export default (state, action) => {
  switch(action.type) {
    case 'SET_MEDIAS':
      return {
        ...state,
        medias: action.payload
      }
    case 'ADD_MEDIAS':
      return {
        ...state,
        medias: [...action.payload, ...state.medias]
      }
    case 'ADD_MEDIA':
      return {
        ...state,
        medias: [action.payload, ...state.medias]
      }
    case 'DELETE_MEDIA':
      return {
        ...state,
        medias: state.medias
            .filter(media => media._id !== action.payload)
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