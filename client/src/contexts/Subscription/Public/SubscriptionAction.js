import axios from 'axios'
import { config } from '../../../Utils/headers/header'
import { getCookie, setCookie } from "../../../services/Cookie"
import { ipv4 } from '../../../Utils/ipv4/ipv4'

const baseUrl = '/api/v1/subscriptions/public'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Add A Mail
export const addSubMail = async (dispatch, email) => {
  setLoading(dispatch, true) 
  
  await axios.post(baseUrl + `/add`, {key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC, subscriber: email }, config)
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