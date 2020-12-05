import React, {useReducer, useContext} from 'react'
import MediaSocialContext from './MediaSocialContext'
import MediaSocialReducer from './MediaSocialReducer'

export const useMediaSocial = () => {
  const { state, dispatch } = useContext(MediaSocialContext)
  return [state, dispatch]
}

export const MediaSocialState = ({ children }) => {
  const initialState = {
    mediaSocials: [],
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(MediaSocialReducer, initialState)

  return (
    <MediaSocialContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </MediaSocialContext.Provider>
  )
}
