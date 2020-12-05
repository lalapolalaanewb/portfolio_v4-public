import React, {useReducer, useContext} from 'react'
import { TechnologyContext } from './TechnologyContext'
import TechnologyReducer from './TechnologyReducer'

export const useTechnology = () => {
  const { state, dispatch } = useContext(TechnologyContext)
  return [state, dispatch]
}

export const TechnologyState = ({ children }) => {
  const initialState = {
    techs: [],
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(TechnologyReducer, initialState)

  return (
    <TechnologyContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </TechnologyContext.Provider>
  )
}
