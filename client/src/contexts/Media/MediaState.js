import React, { useContext, useReducer } from 'react'
import MediaContext from './MediaContext'
import MediaReducer from './MediaReducer'

export const useMedia = () => {
  const { state, dispatch } = useContext(MediaContext)
  return [state, dispatch]
}

export const MediaState = ({ children }) => {
  const initialState = {
    medias: [],
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(MediaReducer, initialState)

  return (
    <MediaContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </MediaContext.Provider>
  )
}
