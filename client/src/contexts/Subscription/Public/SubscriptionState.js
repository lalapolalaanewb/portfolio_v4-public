import React, { useContext, useReducer } from 'react'
import SubscriptionContext from './SubscriptionContext'
import SubscriptionReducer from './SubscriptionReducer'

export const useSubscription = () => {
  const { state, dispatch } = useContext(SubscriptionContext)
  return [state, dispatch]
}

export const SubscriptionState = ({ children }) => {
  const initialState = {
    loading: false,
    error: false,
    success: false,
    message: ''
  }

  const [state, dispatch] = useReducer(SubscriptionReducer, initialState)

  return (
    <SubscriptionContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </SubscriptionContext.Provider>
  )
}
