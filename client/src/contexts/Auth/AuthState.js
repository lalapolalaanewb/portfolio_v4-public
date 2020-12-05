import React, { useContext, useReducer } from 'react'
import { AuthContext } from './AuthContext'
import AuthReducer from './AuthReducer'

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext)
  return [state, dispatch]
}

export const AuthState = ({ children }) => {
  const initialState = {
    authenticated: false,
    loading: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  return (
    <AuthContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </AuthContext.Provider>
  )
}
