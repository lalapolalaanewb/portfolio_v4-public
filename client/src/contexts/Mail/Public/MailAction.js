import axios from 'axios'
import { config, configMultiPart } from '../../../Utils/headers/header'
import { getCookie, setCookie } from "../../../services/Cookie"
import { ipv4 } from '../../../Utils/ipv4/ipv4'

const baseUrl = '/api/v1/mails/public'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Status Contact
export const getStatusContact = async (dispatch) => {
  setLoading(dispatch, true)
  
  // do fetch
  await axios.post(baseUrl + '/get/status', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC }, config)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_CONTACTID',
      payload: result._id 
    })

    dispatch({
      type: 'SET_STATUSCONTACT',
      payload: result.status 
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

// Add A Mail
export const addMail = async (dispatch, contactId, mail) => {
  setLoading(dispatch, true) 
  
  await axios.post(baseUrl + `/add`, {key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC, mail: mail, contactId: contactId }, config)
  .then(async res => {
    const result = await res.data.data
    
    // update success
    setSuccess(dispatch, {
      status: true,
      message: result
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