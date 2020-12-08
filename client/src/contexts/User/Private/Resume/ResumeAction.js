import axios from 'axios'
import { config, configMultiPart } from '../../../../Utils/headers/header'
import { getCookie, setCookie } from "../../../../services/Cookie"
import { ipv4 } from '../../../../Utils/ipv4/ipv4'

const baseUrl = '/api/v1/users/private/profile/resume'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Resumes
export const getResumes = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.post(baseUrl + '/get', { uid: '' }, config)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_RESUMES',
      payload: result.resumes 
    })

    dispatch({
      type: 'SET_PROJECTS',
      payload: result.projects.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)) 
    })

    dispatch({
      type: 'SET_CREATOR',
      payload: result._id 
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

// Add New Resume
export const addResume = async (dispatch, resume) => {
  setLoading(dispatch, true)
  
  await axios.post(baseUrl + '/add', resume, config)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_RESUME',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new resume.'
    })
  })
  .catch(async error => {
    const result = await error.response.data

    // update state
    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}

// Update A Resume
export const updateResume = async (dispatch, resumeId, resume) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update`, { resumeId, resume }, config)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'DELETE_RESUME',
      payload: resumeId
    })
    dispatch({
      type: 'ADD_RESUME',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the resume.'
    })
  })
  .catch(async error => {
    const result = await error.response.data

    // update state
    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}

// Update A Resume Publish
export const updateResumePublish = async (dispatch, resumeId, intention) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/publish`, { resumeId, intention }, config)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'DELETE_RESUME',
      payload: resumeId
    })
    dispatch({
      type: 'ADD_RESUME',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the resume publish status.'
    })
  })
  .catch(async error => {
    const result = await error.response.data

    // update state
    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}

// Delete A Resume
export const deleteResume = async (dispatch, resumeId, creator) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/delete`, { resumeId, creator }, config)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_RESUME',
      payload: resumeId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the resume.'
    })
  })
  .catch(async error => {
    const result = await error.response.data

    // update state
    setError(dispatch, {
      status: true,
      message: result.error
      // message: error
    })
  })
}