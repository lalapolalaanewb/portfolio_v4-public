import React, { useContext, useReducer } from 'react'
import PersonalContext from './PersonalContext'
import PersonalReducer from './PersonalReducer'

export const usePersonal = () => {
  const { state, dispatch } = useContext(PersonalContext)
  return [state, dispatch]
}

export const PersonalState = ({ children }) => {
  const initialState = {
    user: {
      name: {},
      credentials: {
        emails: {}
      }
    },
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(PersonalReducer, initialState)

  return (
    <PersonalContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </PersonalContext.Provider>
  )
}
