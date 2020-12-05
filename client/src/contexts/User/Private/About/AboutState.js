import React, { useContext, useReducer } from 'react'
import AboutContext from './AboutContext'
import AboutReducer from './AboutReducer'

export const useAbout = () => {
  const { state, dispatch } = useContext(AboutContext)
  return [state, dispatch]
}

export const AboutState = ({ children }) => {
  const initialState = {
    abouts: [],
    creator: '',
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(AboutReducer, initialState)

  return (
    <AboutContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </AboutContext.Provider>
  )
}
