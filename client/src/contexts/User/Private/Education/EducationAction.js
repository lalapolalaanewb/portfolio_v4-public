import axios from 'axios'
import { config, configMultiPart } from '../../../../Utils/headers/header'
import { getCookie, setCookie } from "../../../../services/Cookie"
import { ipv4 } from '../../../../Utils/ipv4/ipv4'

const baseUrl = '/api/v1/users/private/profile/education'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Edus
export const getEdus = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.post(baseUrl + '/get', { uid: '' }, config)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_EDUS',
      payload: result.educations 
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

// Add New Edu
export const addEdu = async (dispatch, edu) => {
  setLoading(dispatch, true)
  
  await axios.post(baseUrl + '/add', edu, config)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_EDU',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new education.'
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

// Update A Edu
export const updateEdu = async (dispatch, eduId, edu) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update`, { eduId, edu }, config)
  .then(async res => {
    const result = await res.data.data

    // update edus
    dispatch({
      type: 'DELETE_EDU',
      payload: eduId
    })
    dispatch({
      type: 'ADD_EDU',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the education.'
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

// Update A Edu Publish
export const updateEduPublish = async (dispatch, eduId, intention) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/publish`, { eduId, intention }, config)
  .then(async res => {
    const result = await res.data.data

    // update edus
    dispatch({
      type: 'DELETE_EDU',
      payload: eduId
    })
    dispatch({
      type: 'ADD_EDU',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the education publish status.'
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

// Delete A Edu
export const deleteEdu = async (dispatch, eduId, creator) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/delete`, { eduId, creator }, config)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_EDU',
      payload: eduId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the education.'
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