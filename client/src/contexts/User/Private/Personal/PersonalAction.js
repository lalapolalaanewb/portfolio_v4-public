import axios from 'axios'
import { configPrivate } from '../../../../Utils/headers/header'

const baseUrl = '/api/v1/users/private/profile/personal'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get All Users
export const getUser = async(dispatch) => {
  setLoading(dispatch, true)

  // get current user cookie
  // let uid = getCookie('uid')

  await axios.get(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data
    
    // set users
    dispatch({
      type: 'SET_USER',
      payload: {
        ...result,
        name: result.name,
        credentials: {
          ...result.credentials,
          emails: result.credentials.emails
        }
      }
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

// Update User's Personal
export const updateUserPersonal = async (dispatch, userId, personal) => {
  setLoading(dispatch, true)
  
  await axios.post(baseUrl + `/update`, { userId, personal }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // set users
    dispatch({
      type: 'SET_USER',
      payload: {
        ...result,
        name: result.name,
        credentials: {
          ...result.credentials,
          emails: result.credentials.emails
        }
      }
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the user.'
    })
  })
  .catch(async error => { console.log(error)
    const result = await error.response.data

    // update state
    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}

// Update User's Personal Password
export const updateUserPersonalPassword = async (dispatch, userId, password) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/password`, { userId, password }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // set users
    dispatch({
      type: 'SET_USER',
      payload: {
        ...result,
        name: result.name,
        credentials: {
          ...result.credentials,
          emails: result.credentials.emails
        }
      }
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: `Successfully update user's password.`
    })
  })
  .catch(async error => { console.log(error)
    const result = await error.response.data

    // update state
    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}