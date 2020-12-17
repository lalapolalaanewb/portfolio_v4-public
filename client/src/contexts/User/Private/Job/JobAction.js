import axios from 'axios'
import { configPrivate } from '../../../../Utils/headers/header'

const baseUrl = '/api/v1/users/private/profile/job'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Jobs
export const getJobs = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.get(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_JOBS',
      payload: result.jobs 
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

// Add New Job
export const addJob = async (dispatch, job) => {
  setLoading(dispatch, true)
  
  await axios.post(baseUrl + '/add', job, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_JOB',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new job.'
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

// Update A Job
export const updateJob = async (dispatch, jobId, job) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update`, { jobId, job }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_JOB',
      payload: jobId
    })
    dispatch({
      type: 'ADD_JOB',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the job.'
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

// Update A Job Publish
export const updateJobPublish = async (dispatch, jobId, intention) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/publish`, { jobId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_JOB',
      payload: jobId
    })
    dispatch({
      type: 'ADD_JOB',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the job publish status.'
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

// Delete A Job
export const deleteJob = async (dispatch, jobId, creator) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/delete`, { jobId, creator }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_JOB',
      payload: jobId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the job.'
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