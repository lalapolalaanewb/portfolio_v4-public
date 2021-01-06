import axios from 'axios'
import { config, configPrivate } from '../../../Utils/headers/header'
import forcedLogout from '../../../Utils/forcedLogout'

const baseUrl = '/api/v1/subscriptions/private'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Subs
export const getSubs = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.post(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_SUBS',
      payload: result 
    })
  })
  .catch(async error => { 
    const result = await error.response
    
    // forced logout if user's server's session expired
    // if(error.response.status === 401) forcedLogout()
    
    // set error
    setError(dispatch, {
      status: true,
      message: result
    })
  })
}

// Update A Sub Noty
export const updateSubNoty = async (dispatch, subId, subscriber, intention) => {
  setLoading(dispatch, true) 
  
  await axios.post(baseUrl + `/update/noty`, { subId, subscriber, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'DELETE_SUB',
      payload: subId
    })
    dispatch({
      type: 'ADD_SUB',
      payload: result.sub
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: result.message
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

// Update A Sub Read
export const updateSubRead = async (dispatch, subId, intention) => {
  setLoading(dispatch, true) 
  
  await axios.post(baseUrl + `/update/read`, { subId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'DELETE_SUB',
      payload: subId
    })
    dispatch({
      type: 'ADD_SUB',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: (() => intention === 'read' ? `Successfully read the mail.` : `Successfully unread the mail.`)()
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

// Update A Sub Reply
export const updateSubReply = async (dispatch, subId, intention) => {
  setLoading(dispatch, true) 
  
  await axios.post(baseUrl + `/update/reply`, { subId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'DELETE_SUB',
      payload: subId
    })
    dispatch({
      type: 'ADD_SUB',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: (() => intention === 'reply' ? `Successfully reply the mail.` : `Successfully unreply the mail.`)()
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

// Delete A Sub
export const deleteSub = async (dispatch, subId) => {
  setLoading(dispatch, true)
  
  await axios.delete(baseUrl + `/delete/${subId}`, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_SUB',
      payload: subId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the mail.'
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