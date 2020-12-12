import axios from 'axios'
import { config } from '../../../Utils/headers/header'
import { getCookie, setCookie } from "../../../services/Cookie"
import { ipv4 } from '../../../Utils/ipv4/ipv4'

const baseUrl = '/api/v1/policies/public'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Get Policy
export const getPolicyComment = async(dispatch) => {
  setLoading(dispatch, true)

  // fetch a policy (comment)
  await axios.post(baseUrl + '/get/comment', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC }, config)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_POLICYCOMMENT',
      payload: result.comment
    })
  })
  .catch(async error => {
    const result = await error.response.data
    
    setError(
      dispatch,
      {
        status: true,
        message: result.error
      }
    )
  })
}