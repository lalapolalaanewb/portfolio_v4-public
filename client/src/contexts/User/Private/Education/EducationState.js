import React, { useContext, useReducer } from 'react'
import EducationContext from './EducationContext'
import EducationReducer from './EducationReducer'

export const useEducation = () => {
  const { state, dispatch } = useContext(EducationContext)
  return [state, dispatch]
}

export const EducationState = ({ children }) => {
  const initialState = {
    edus: [],
    creator: '',
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(EducationReducer, initialState)

  return (
    <EducationContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </EducationContext.Provider>
  )
}
