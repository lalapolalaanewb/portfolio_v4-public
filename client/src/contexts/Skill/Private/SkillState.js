import React, { useContext, useReducer } from 'react'
import SkillContext from './SkillContext'
import SkillReducer from './SkillReducer'

export const useSkill = () => {
  const { state, dispatch } = useContext(SkillContext)
  return [state, dispatch]
}

export const SkillState = ({ children }) => {
  const initialState = {
    skills: [],
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(SkillReducer, initialState)

  return (
    <SkillContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </SkillContext.Provider>
  )
}
