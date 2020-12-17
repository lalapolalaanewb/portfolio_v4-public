import axios from 'axios'
import { configPrivate, configMultiPartPrivate } from '../../../../Utils/headers/header'

const baseUrl = '/api/v1/users/private/profile/home'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Homes
export const getHomes = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.get(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_HOMES',
      payload: result.homes 
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

// Add New Home
export const addHome = async (dispatch, home) => {
  setLoading(dispatch, true)
  
  const formData = new FormData()
  formData.append('topline', home.topline)
  formData.append('headline', home.headline)
  formData.append('description', home.desc)
  formData.append('btnPurpose', home.btnPurpose)
  formData.append('btnLabel', home.btnLabel)
  formData.append('btnLink', home.btnLink)
  formData.append('imgPosition', home.imgPos)
  formData.append('creator', home.creator)
  formData.append('file', home.img)

  await axios.post(baseUrl + '/add', formData, configMultiPartPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_HOME',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new home.'
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

// Update A Home
export const updateHome = async (dispatch, homeId, home) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update`, { homeId, home }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_HOME',
      payload: homeId
    })
    dispatch({
      type: 'ADD_HOME',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the home.'
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

// Update A Home Img
export const updateHomeImg = async (dispatch, homeId, img) => {
  setLoading(dispatch, true)

  const formData = new FormData()
  formData.append('homeId', homeId)
  formData.append('imgSrc', img.old)
  formData.append('file', img.new)

  await axios.post(baseUrl + `/update/image`, formData, configMultiPartPrivate)
  .then(async res => {
    const result = await res.data.data

    // update homes
    dispatch({
      type: 'DELETE_HOME',
      payload: homeId
    })
    dispatch({
      type: 'ADD_HOME',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the home.'
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

// Update A Home Publish
export const updateHomePublish = async (dispatch, homeId, intention) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/publish`, { homeId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update homes
    dispatch({
      type: 'DELETE_HOME',
      payload: homeId
    })
    dispatch({
      type: 'ADD_HOME',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the home publish status.'
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

// Delete A Home
export const deleteHome = async (dispatch, homeId, creator) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/delete`, { homeId, creator }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_HOME',
      payload: homeId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the home.'
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