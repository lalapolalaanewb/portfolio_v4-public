import axios from 'axios'
import { config } from '../../Utils/headers/header'
import { getCookie } from '../../services/Cookie'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { error: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get All Media Socials
export const getMediaSocials = async(dispatch) => {
  setLoading(dispatch, true)

  // get current user cookie
  // let uid = getCookie('uid')

  await axios.post('/api/v1/mediasocials/private/get', { uid: 'uid' }, config)
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
    const result = await error.response.data

    // set error
    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}

// Add New Media Social
export const addMediaSocial = async (dispatch, mediaSocial) => {
  setLoading(dispatch, true)
  
  await axios.post('/api/v1/mediasocials/private/add/', mediaSocial, config)
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

  await axios.post(`/api/v1/mediasocials/private/update/${mediaSocialId}`, mediaSocial, config)
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

  await axios.delete(`/api/v1/mediasocials/private/delete/${mediaSocialId}`, config)
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