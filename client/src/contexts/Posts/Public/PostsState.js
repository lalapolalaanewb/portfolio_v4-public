import React from 'react'
import { useReducer } from 'react'
import { useContext } from 'react'
import { PostsContext } from './PostsContext'
import PostsReducer from './PostsReducer'

export const usePosts = () => {
  const { state, dispatch } = useContext(PostsContext)
  return [state, dispatch]
}

export const PostsState = ({ children }) => {
  const initialState = {
    posts: [],
    techList: [],
    loading: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(PostsReducer, initialState)

  return (
    <PostsContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </PostsContext.Provider>
  )
}
