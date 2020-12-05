import React, { useContext, useReducer } from 'react'
import { ProjectsContext } from './ProjectsContext'
import ProjectsReducer from './ProjectsReducer'

export const useProjects = () => {
  const { state, dispatch } = useContext(ProjectsContext)
  return [state, dispatch]
}

export const ProjectsState = ({ children }) => {
  const initialState = {
    projects: [],
    techList: [],
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(ProjectsReducer, initialState)

  return (
    <ProjectsContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </ProjectsContext.Provider>
  )
}
