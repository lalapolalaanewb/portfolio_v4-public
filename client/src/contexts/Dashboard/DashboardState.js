import React, {useReducer, useContext} from 'react'
import DashboardContext from './DashboardContext'
import DashboardReducer from './DashboardReducer'

export const useDashboard = () => {
  const { state, dispatch } = useContext(DashboardContext)
  return [state, dispatch]
}

export const DashboardState = ({ children }) => {
  const initialState = {
    dashboard: {
      user: {
        _id: '',
        homes: 0,
        abouts: 0,
        socialMedias: 0,
        jobs: 0,
        skills: 0,
        techs: 0,
        projects: 0,
        posts: 0
      },
      usersCount: 0,
      homesCount: 0,
      aboutsCount: 0,
      socialMediasCount: 0,
      jobsCount: 0,
      skillsCount: 0,
      techsCount: 0,
      projectsCount: 0,
      postsCount: 0
    },
    loading: false,
    success: false,
    error: false,
    message: ''
  }

  const [state, dispatch] = useReducer(DashboardReducer, initialState)

  return (
    <DashboardContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </DashboardContext.Provider>
  )
}
