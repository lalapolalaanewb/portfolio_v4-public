import React, { useContext, useReducer } from 'react'
import PolicyContext from './PolicyContext'
import PolicyReducer from './PolicyReducer'

export const usePolicy = () => {
  const { state, dispatch } = useContext(PolicyContext)
  return [state, dispatch]
}

export const PolicyState = ({ children }) => {
  const initialState = {
    policies: [],
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(PolicyReducer, initialState)

  return (
    <PolicyContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </PolicyContext.Provider>
  )
}
