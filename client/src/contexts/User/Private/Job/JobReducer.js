export default (state, action) => {
  switch(action.type) {
    case 'SET_JOBS':
      return {
        ...state,
        jobs: action.payload
      }
    case 'SET_CREATOR':
      return {
        ...state,
        creator: action.payload
      } 
    case 'ADD_JOB':
      return {
        ...state,
        jobs: [action.payload, ...state.jobs]
      }
    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(job => job._id !== action.payload)
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