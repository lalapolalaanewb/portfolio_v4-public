import React from 'react'
import { useReducer } from 'react'
import { useContext } from 'react'
import { PostContext } from './PostContext'
import PostReducer from './PostReducer'

export const usePost = () => {
  const { state, dispatch } = useContext(PostContext)
  return [state, dispatch]
}

export const PostState = ({ children }) => {
  const initialState = {
    post: {
      tech: {},
      creator: {
        name: {}
      }
    },
    loading: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(PostReducer, initialState)

  return (
    <PostContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </PostContext.Provider>
  )
}
