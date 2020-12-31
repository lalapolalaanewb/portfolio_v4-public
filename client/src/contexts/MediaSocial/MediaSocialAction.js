import axios from 'axios'
import { configPrivate } from '../../Utils/headers/header'
import forcedLogout from '../../Utils/forcedLogout'

const baseUrl = '/api/v1/mediasocials/private'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { error: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get All Media Socials
export const getMediaSocials = async(dispatch) => {
  setLoading(dispatch, true)

  await axios.get(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data
    // console.log(result)
    // set techs
    dispatch({
      type: 'SET_MEDIASOCIALS',
      payload: result
    })
  })
  .catch(async error => {
    const result = await error.response
    
    // forced logout if user's server's session expired
    if(error.response.status === 401) forcedLogout()
    
    // set error
    setError(dispatch, {
      status: true,
      message: result.data.error
    })
  })
}

// Add New Media Social
export const addMediaSocial = async (dispatch, mediaSocial) => {
  setLoading(dispatch, true)
  
  await axios.post(baseUrl + '/add', mediaSocial, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_MEDIASOCIAL',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new media social.'
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

// Update A Media Social
export const updateMediaSocial = async (dispatch, mediaSocialId, mediaSocial) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/${mediaSocialId}`, mediaSocial, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_MEDIASOCIAL',
      payload: mediaSocialId
    })
    dispatch({
      type: 'ADD_MEDIASOCIAL',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the media social.'
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

// Delete A Media Social
export const deleteMediaSocial = async (dispatch, mediaSocialId) => {
  setLoading(dispatch, true)

  await axios.delete(baseUrl + `/delete/${mediaSocialId}`, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_MEDIASOCIAL',
      payload: mediaSocialId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the media social.'
    })
  })
  .catch(async error => { console.log(error.response)
    const result = await error.response.data

    // update state
    setError(dispatch, {
      status: true,
      message: result.error
      // message: error
    })
  })
}