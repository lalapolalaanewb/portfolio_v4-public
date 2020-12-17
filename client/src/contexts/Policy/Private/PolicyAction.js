import axios from 'axios'
import { configPrivate } from '../../../Utils/headers/header'

const baseUrl = '/api/v1/policies/private'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Policies
export const getPolicies = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.get(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_POLICIES',
      payload: result 
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

// Add New Policy
export const addPolicy = async (dispatch, policy) => {
  setLoading(dispatch, true)
  
  await axios.post(baseUrl + '/add', policy, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_POLICY',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new policy.'
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

// Update A Policy
export const updatePolicy = async (dispatch, policyId, policy) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update`, { policyId, policy }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'DELETE_POLICY',
      payload: policyId
    })
    dispatch({
      type: 'ADD_POLICY',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the policy.'
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

// Update A Policy Publish
export const updatePolicyPublish = async (dispatch, policyId, intention) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/publish`, { policyId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'DELETE_POLICY',
      payload: policyId
    })
    dispatch({
      type: 'ADD_POLICY',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the policy publish status.'
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

// Delete A Policy
export const deletePolicy = async (dispatch, policyId) => {
  setLoading(dispatch, true)

  await axios.delete(baseUrl + `/delete/${policyId}`, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_POLICY',
      payload: policyId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the policy.'
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