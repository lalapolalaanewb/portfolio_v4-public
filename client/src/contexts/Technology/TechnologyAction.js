import axios from 'axios'
import { configPrivate } from '../../Utils/headers/header'

const baseUrl = '/api/v1/techs/private'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get All Techs
export const getTechs = async(dispatch) => {
  setLoading(dispatch, true)

  // get current user cookie
  // let uid = getCookie('uid')

  await axios.get(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data
    // console.log(result)
    // set techs
    dispatch({
      type: 'SET_TECHS',
      payload: result
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

// Add New Tech
export const addTech = async (dispatch, tech) => {
  setLoading(dispatch, true)
  
  await axios.post(baseUrl + '/add', tech, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_TECH',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new tech.'
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

// Update A Tech
export const updateTech = async (dispatch, techId, tech) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/${techId}`, tech, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_TECH',
      payload: techId
    })
    dispatch({
      type: 'ADD_TECH',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the tech.'
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

// Delete A Tech
export const deleteTech = async (dispatch, techId) => {
  setLoading(dispatch, true)

  await axios.delete(baseUrl + `/delete/${techId}`, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_TECH',
      payload: techId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the tech.'
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