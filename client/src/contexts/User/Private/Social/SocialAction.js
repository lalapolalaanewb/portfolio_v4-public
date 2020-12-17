import axios from 'axios'
import { configPrivate } from '../../../../Utils/headers/header'

const baseUrl = '/api/v1/users/private/profile/social'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Socials
export const getSocials = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.get(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_SOCIALS',
      payload: result.socialMedias 
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

// Add New Social
export const addSocial = async (dispatch, social) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + '/add', social, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_SOCIAL',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new social.'
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

// Update A Social
export const updateSocial = async (dispatch, socialId, social) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update`, { socialId, social }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_SOCIAL',
      payload: socialId
    })
    dispatch({
      type: 'ADD_SOCIAL',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the social.'
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

// Update A Social Publish
export const updateSocialPublish = async (dispatch, socialId, intention) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/publish`, { socialId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_SOCIAL',
      payload: socialId
    })
    dispatch({
      type: 'ADD_SOCIAL',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the social publish status.'
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

// Delete A Social
export const deleteSocial = async (dispatch, socialId, creator) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/delete`, { socialId, creator }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_SOCIAL',
      payload: socialId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the social.'
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