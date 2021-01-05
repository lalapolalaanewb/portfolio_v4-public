import axios from 'axios'
import { configPrivate } from '../../../Utils/headers/header'
import forcedLogout from '../../../Utils/forcedLogout'

const baseUrl = '/api/v1/users/private'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get All Users
export const getUsers = async(dispatch) => {
  setLoading(dispatch, true)

  await axios.get(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data
    
    // set users
    dispatch({
      type: 'SET_USERS',
      payload: result
    })
  })
  .catch(async error => {
    const result = await error.response
    
    // forced logout if user's server's session expired
    if(error.response.status === 401) forcedLogout()
    
    // set error
    setError(dispatch, {
      status: true,
      message: result
    })
  })
}

// Add New User
export const addUser = async (dispatch, user) => {
  setLoading(dispatch, true)
  
  await axios.post(baseUrl + '/add', user, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_USER',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new user.'
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

// Update A User
export const updateUserActive = async (dispatch, userId, intention) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/active`, { userId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update users
    dispatch({
      type: 'DELETE_USER',
      payload: userId
    })
    dispatch({
      type: 'ADD_USER',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: (() => intention === 'activate' ? `Successfully activate the post.` : `Successfully deactivate the post.`)()
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

// Update A User
export const updateUser = async (dispatch, userId, user) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/${userId}`, user, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update users
    dispatch({
      type: 'DELETE_USER',
      payload: userId
    })
    dispatch({
      type: 'ADD_USER',
      payload: result
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

// Delete A User
export const deleteUser = async (dispatch, userId) => {
  setLoading(dispatch, true)

  await axios.delete(baseUrl + `/delete/${userId}`, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_USER',
      payload: userId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the user.'
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