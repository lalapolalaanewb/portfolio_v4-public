import axios from 'axios'
import { config } from '../../../Utils/headers/header'
import { getCookie, setCookie } from "../../../services/Cookie"
import { ipv4 } from '../../../Utils/ipv4/ipv4'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Get User (Footer Public Component)
export const getUserOnFooterPublic = async (dispatch) => {
  setLoading(dispatch, true)

  // fetch user
  await axios.post('/api/v1/users/getfooterpublic', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC }, config)
  .then(async res => {
    const result = await res.data.data

    // check if socialMedias published?
    let trackPublishedSocialMedias = []

    result.socialMedias.map(socialMedia => {
      if(socialMedia.status === 1) trackPublishedSocialMedias.push({...socialMedia})
    })

    dispatch({
      type: 'SET_USERFOOTERPUBLIC',
      payload: {
        ...result,
        socialMedias: trackPublishedSocialMedias
      }
    })
  })
  .catch(async error => { 
    const result = await error.response.data

    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}

// Get User (Home Page)
export const getUserOnHome = async (dispatch) => {
  setLoading(dispatch, true)

  // fetch user
  await axios.post('/api/v1/users/gethome', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC }, config)
  .then(async res => { 
    const result = await res.data.data
    console.log(result)
    dispatch({
      type: 'SET_USERHOME',
      payload: {
        ...result,
        homes: result.homes
      }
    })
  })
  .catch(async error => { 
    const result = await error.response.data

    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}

// Get User (About Page)
export const getUserOnAbout = async (dispatch) => {
  setLoading(dispatch, true)

  // fetch user
  await axios.post('/api/v1/users/getabout', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC }, config)
  .then(async res => { 
    const result = await res.data.data
    
    dispatch({
      type: 'SET_USERABOUT',
      payload: {
        ...result,
        name: result.name,
        abouts: result.abouts,
        jobs: result.jobs,
        skills: result.skills
      }
    })
  })
  .catch(async error => { 
    const result = await error.response.data

    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}

// Get User (Resume Page)
export const getUserOnResume = async (dispatch) => {
  setLoading(dispatch, true)

  // fetch user
  await axios.post('/api/v1/users/getresume', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC }, config)
  .then(async res => { 
    const result = await res.data.data
    
    dispatch({
      type: 'SET_USERRESUME',
      payload: {
        ...result,
        name: result.name,
        resume: {
          ...result.resume,
          contactInfo: result.resume.contactInfo,
          techs: result.resume.techs,
          projects: result.resume.projects,
          educations: result.resume.educations,
          jobs: result.resume.jobs
        }
      }
    })
  })
  .catch(async error => { 
    const result = await error.response.data

    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}