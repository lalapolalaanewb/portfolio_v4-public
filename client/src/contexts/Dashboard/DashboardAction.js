import axios from 'axios'
import { configPrivate } from '../../Utils/headers/header'
import forcedLogout from '../../Utils/forcedLogout'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { error: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get All Dashboard
export const getDashboard = async(dispatch) => {
  setLoading(dispatch, true)
  console.log(configPrivate)
  await axios.get('/api/v1/dashboard', configPrivate)
  .then(async res => {
    const result = await res
    console.log(result)
    // set states 
    let pp = {
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
    }
    dispatch({
      type: 'SET_DASHBOARD',
      payload: result.status !== 304 ? result.data.data : pp
    })
  })
  .catch(async error => { 
    const result = await error.response
    console.log(result)
    // forced logout if user's server's session expired
    // if(error.response.status === 401) forcedLogout()
    
    // set error
    setError(dispatch, {
      status: true,
      // message: result.status === 400 || result.status === 401 ? result.data.error : result
      message: result
    })
  })
}

// Reset All Redis Data
export const resetAllRedisData = async(dispatch) => {
  setLoading(dispatch, true)
  
  await axios.get('/api/v1/dashboard/resetredis', configPrivate)
  .then(async res => {
    const result = await res.data.data
    
    // set states
    dispatch({
      type: 'SET_DASHBOARD',
      payload: result
    })

    // set success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully reset all redis data to the latest data in database.'
    })
  })
  .catch(async error => {
    const result = await error.response
    
    // forced logout if user's server's session expired
    // if(error.response.status === 401) forcedLogout()
    
    // set error
    setError(dispatch, {
      status: true,
      message: result.data.error
    })
  })
}