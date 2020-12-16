import React, { useContext, useReducer } from 'react'
import MailContext from './MailContext'
import MailReducer from './MailReducer'

export const useMail = () => {
  const { state, dispatch } = useContext(MailContext)
  return [state, dispatch]
}

export const MailState = ({ children }) => {
  const initialState = {
    mails: [],
    contact: '',
    loading: false,
    error: false,
    success: false,
    message: ''
  }

  const [state, dispatch] = useReducer(MailReducer, initialState)

  return (
    <MailContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </MailContext.Provider>
  )
}