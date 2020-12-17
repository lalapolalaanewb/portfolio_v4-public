import axios from 'axios'
import { configPrivate, configMultiPartPrivate } from '../../../../Utils/headers/header'

const baseUrl = '/api/v1/users/private/profile/about'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Abouts
export const getAbouts = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.get(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_ABOUTS',
      payload: result.abouts 
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

// Add New About
export const addAbout = async (dispatch, about) => {
  setLoading(dispatch, true)
  
  const formData = new FormData()
  formData.append('title', about.title)
  formData.append('description', about.desc)
  formData.append('btnPurpose', about.btnPurpose)
  formData.append('btnLabel', about.btnLabel)
  formData.append('btnLink', about.btnLink)
  formData.append('imgPosition', about.imgPos)
  formData.append('creator', about.creator)
  formData.append('file', about.img)

  await axios.post(baseUrl + '/add', formData, configMultiPartPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_ABOUT',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new about.'
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

// Update A About
export const updateAbout = async (dispatch, aboutId, about) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update`, { aboutId, about }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_ABOUT',
      payload: aboutId
    })
    dispatch({
      type: 'ADD_ABOUT',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the about.'
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

// Update A About Img
export const updateAboutImg = async (dispatch, aboutId, img) => {
  setLoading(dispatch, true)

  const formData = new FormData()
  formData.append('aboutId', aboutId)
  formData.append('imgSrc', img.old)
  formData.append('file', img.new)

  await axios.post(baseUrl + `/update/image`, formData, configMultiPartPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_ABOUT',
      payload: aboutId
    })
    dispatch({
      type: 'ADD_ABOUT',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the about.'
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

// Update A About Publish
export const updateAboutPublish = async (dispatch, aboutId, intention) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/publish`, { aboutId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_ABOUT',
      payload: aboutId
    })
    dispatch({
      type: 'ADD_ABOUT',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the about publish status.'
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

// Delete A About
export const deleteAbout = async (dispatch, aboutId, creator) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/delete`, { aboutId, creator }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_ABOUT',
      payload: aboutId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the about.'
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