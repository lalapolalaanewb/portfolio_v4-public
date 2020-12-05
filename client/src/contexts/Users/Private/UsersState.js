import React, { useContext, useReducer } from 'react'
import UserContext from './UsersContext'
import UserReducer from './UsersReducer'

export const useUsers = () => {
  const { state, dispatch } = useContext(UserContext)
  return [state, dispatch]
}

export const UsersState = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(UserReducer, initialState)

  return (
    <UserContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </UserContext.Provider>
  )
}
