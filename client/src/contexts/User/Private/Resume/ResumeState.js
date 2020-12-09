import React, { useContext, useReducer } from 'react'
import ResumeContext from './ResumeContext'
import ResumeReducer from './ResumeReducer'

export const useResume = () => {
  const { state, dispatch } = useContext(ResumeContext)
  return [state, dispatch]
}

export const ResumeState = ({ children }) => {
  const initialState = {
    resumes: [],
    projects: [],
    educations: [],
    occupations: [],
    creator: '',
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(ResumeReducer, initialState)

  return (
    <ResumeContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </ResumeContext.Provider>
  )
}
