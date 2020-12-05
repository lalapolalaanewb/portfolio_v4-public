import axios from 'axios'
import { config } from '../../Utils/headers/header'
import { getCookie } from '../../services/Cookie'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { error: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get All Dashboard
export const getDashboard = async(dispatch) => {
  setLoading(dispatch, true)

  // get current user cookie
  // let uid = getCookie('uid')

  await axios.post('/api/v1/dashboard', { uid: 'uid' }, config)
  .then(async res => {
    const result = await res.data.data
    console.log(result)
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