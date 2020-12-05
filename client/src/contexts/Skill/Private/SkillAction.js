import axios from 'axios'
import { config } from '../../../Utils/headers/header'
import { getCookie, setCookie } from "../../../services/Cookie"
import { ipv4 } from '../../../Utils/ipv4/ipv4'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Skills
export const getSkills = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.post('/api/v1/skills/private/get', { uid: '' }, config)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_SKILLS',
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

// Add New Skill
export const addSkill = async (dispatch, skill) => {
  setLoading(dispatch, true)
  
  await axios.post('/api/v1/skills/private/add/', skill, config)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_SKILL',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new skill.'
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

// Update A Skill
export const updateSkill = async (dispatch, skillId, skill) => {
  setLoading(dispatch, true)

  await axios.post(`/api/v1/skills/private/update/${skillId}`, skill, config)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_SKILL',
      payload: skillId
    })
    dispatch({
      type: 'ADD_SKILL',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the skill.'
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

// Delete A Skill
export const deleteSkill = async (dispatch, skillId, creator) => {
  setLoading(dispatch, true)

  await axios.post(`/api/v1/skills/private/delete/${skillId}`, { creator }, config)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_SKILL',
      payload: skillId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the skill.'
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