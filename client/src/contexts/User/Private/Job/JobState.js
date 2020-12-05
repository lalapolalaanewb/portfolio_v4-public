import React, { useContext, useReducer } from 'react'
import JobContext from './JobContext'
import JobReducer from './JobReducer'

export const useJob = () => {
  const { state, dispatch } = useContext(JobContext)
  return [state, dispatch]
}

export const JobState = ({ children }) => {
  const initialState = {
    jobs: [],
    creator: '',
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(JobReducer, initialState)

  return (
    <JobContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </JobContext.Provider>
  )
}
