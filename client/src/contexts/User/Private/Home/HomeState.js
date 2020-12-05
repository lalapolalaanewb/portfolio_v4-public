import React, { useContext, useReducer } from 'react'
import HomeContext from './HomeContext'
import HomeReducer from './HomeReducer'

export const useHome = () => {
  const { state, dispatch } = useContext(HomeContext)
  return [state, dispatch]
}

export const HomeState = ({ children }) => {
  const initialState = {
    homes: [],
    creator: '',
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(HomeReducer, initialState)

  return (
    <HomeContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </HomeContext.Provider>
  )
}
