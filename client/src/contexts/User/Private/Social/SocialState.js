import React, { useContext, useReducer } from 'react'
import SocialContext from './SocialContext'
import SocialReducer from './SocialReducer'

export const useSocial = () => {
  const { state, dispatch } = useContext(SocialContext)
  return [state, dispatch]
}

export const SocialState = ({ children }) => {
  const initialState = {
    socials: [],
    creator: '',
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(SocialReducer, initialState)
  
  return (
    <SocialContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </SocialContext.Provider>
  )
}
