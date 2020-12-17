import axios from 'axios'
import { configPrivate } from '../../Utils/headers/header'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { error: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get All Dashboard
export const getDashboard = async(dispatch) => {
  setLoading(dispatch, true)
  
  await axios.get('/api/v1/dashboard', configPrivate)
  .then(async res => {
    const result = await res.data.data
    
    // set techs
    dispatch({
      type: 'SET_DASHBOARD',
      payload: result
    })
  })
  .catch(async error => { 
    if(error.response && error.response.status === 500) console.log(error.response.status)
    const result = await error.response.data

    // set error
    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}