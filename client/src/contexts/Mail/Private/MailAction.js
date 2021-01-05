import axios from 'axios'
import { configPrivate } from '../../../Utils/headers/header'
import forcedLogout from '../../../Utils/forcedLogout'

const baseUrl = '/api/v1/mails/private'
// let uid = getCookie('uid')

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Mails
export const getMails = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.get(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_MAILS',
      payload: result.mails 
    })

    dispatch({
      type: 'SET_CONTACT',
      payload: result._id
    })
  })
  .catch(async error => { 
    const result = await error.response
    
    // forced logout if user's server's session expired
    // if(error.response.status === 401) forcedLogout()
    
    // set error
    setError(dispatch, {
      status: true,
      message: result.data ? result.data.error : result
    })
  })
}

// Update A Mail Noty
export const updateMailNoty = async (dispatch, contactId, mailId, mail, intention) => {
  setLoading(dispatch, true) 
  
  await axios.post(baseUrl + `/update/noty`, { contactId, mailId, mail, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'DELETE_MAIL',
      payload: mailId
    })
    dispatch({
      type: 'ADD_MAIL',
      payload: result.mail
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

// Update A Mail Read
export const updateMailRead = async (dispatch, mailId, intention) => {
  setLoading(dispatch, true) 
  
  await axios.post(baseUrl + `/update/read`, { mailId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'DELETE_MAIL',
      payload: mailId
    })
    dispatch({
      type: 'ADD_MAIL',
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

// Update A Mail Reply
export const updateMailReply = async (dispatch, mailId, intention) => {
  setLoading(dispatch, true) 
  
  await axios.post(baseUrl + `/update/reply`, { mailId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'DELETE_MAIL',
      payload: mailId
    })
    dispatch({
      type: 'ADD_MAIL',
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

// Delete A Mail
export const deleteMail = async (dispatch, mailId, contact) => {
  setLoading(dispatch, true)
  
  await axios.post(baseUrl + `/delete/${mailId}`, { contact }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_MAIL',
      payload: mailId
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