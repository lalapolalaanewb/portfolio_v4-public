import React from 'react'
import { useReducer } from 'react'
import { useContext } from 'react'
import { CommentsContext } from './CommentsContext'
import CommentsReducer from './CommentsReducer'

export const useComments = () => {
  const { state, dispatch } = useContext(CommentsContext)
  return [state, dispatch]
}

export const CommentsState = ({ children }) => {
  const initialState = {
    comments: [],
    loading: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(CommentsReducer, initialState)

  return (
    <CommentsContext.Provider value={{
      state: state, 
      dispatch: dispatch
    }}>
      {children}
    </CommentsContext.Provider>
  )
}
