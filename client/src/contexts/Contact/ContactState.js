import React, { useContext, useReducer } from 'react'
import ContactContext from './ContactContext'
import ContactReducer from './ContactReducer'

export const useContact = () => {
  const { state, dispatch } = useContext(ContactContext)
  return [state, dispatch]
}

export const ContactState = ({ children }) => {
  const initialState = {
    contact: {
      senderGmail: '',
      senderEmail: '',
      clientId: '',
      clientSecret: '',
      refreshToken: ''
    },
    loading: false,
    error: false,
    success: false,
    message: ''
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState)

  return (
    <ContactContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </ContactContext.Provider>
  )
}