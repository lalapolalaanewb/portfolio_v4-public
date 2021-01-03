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
        abouts: 0,
        edus: 0,
        homes: 0,
        jobs: 0,
        mails: 0,
        medias: 0,
        posts: 0,
        projects: 0,
        skills: 0,
        socialMedias: 0,
        subscriptions: 0,
        techs: 0
      },
      aboutsCount: 0,
      edusCount: 0,
      homesCount: 0,
      jobsCount: 0,
      mailsCount: 0,
      mediasCount: 0,
      postsCount: 0,
      projectsCount: 0,
      skillsCount: 0,
      socialMediasCount: 0,
      subscriptionsCount: 0,
      techsCount: 0,
      usersCount: 0
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
