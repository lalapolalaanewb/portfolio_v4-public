import axios from 'axios'
import { config } from '../../../../Utils/headers/header'
import { getCookie } from '../../../../services/Cookie'

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

  await axios.post('/api/v1/users/private/profile/personal/get', { uid: 'uid' }, config)
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

// Add User's Job
// export const addUserJob = async (dispatch, userId, job) => {}

// Add User's Social Media
// export const addUserSocial = async (dispatch, userId, social) => {}

// Update User's Personal
export const updateUserPersonal = async (dispatch, userId, personal) => {
  setLoading(dispatch, true)
  
  await axios.post(`/api/v1/users/private/profile/personal/update`, { userId, personal }, config)
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

  await axios.post(`/api/v1/users/private/profile/personal/update/password`, { userId, password }, config)
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

// Update User's About Img
// export const updateUserAboutImg = async (dispatch, userId, personalImg) => {
//   setLoading(dispatch, true)
// }

// Update User's Job
// export const updateUserJob = async (dispatch, userId, job) => {}

// Update User's Social
// export const updateUserSocial = async (dispatch, userId, social) => {}

// Delete User's Job
// export const deleteUserJob = async (dispatch, userId, jobId) => {}

// Delete User's Social
// export const deleteUserSocial = async (dispatch, userId, socialId) => {}