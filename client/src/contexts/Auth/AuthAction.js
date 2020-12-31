import axios from 'axios'
import { config, configPrivate } from '../../Utils/headers/header'
import { getCookie, setCookie, removeCookie } from '../../services/Cookie'
import { ipv4 } from '../../Utils/ipv4/ipv4'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { error: error.status, message: error.message } })

// User Login
export const isLogin = async(dispatch, { email, password }) => {
  setLoading(dispatch, true)

  await axios.post('/api/v1/auth', { uid: '', email: email, password: password }, config)
  .then(async res => {
    const result = await res.data.data
    
    // set uid cookie to res.data.data.uid & options of expires to res.data.data.sato & options of path to /pfv4-admin
    setCookie('uid', result.uid, { path: '/', expires: new Date(result.sato) })
    // for page refresh
    setCookie('onRefresh', '', { path: '/' })

    dispatch({
      type: 'SET_ISAUTHENTICATED',
      payload: true
    })
  }).catch(async error => {
    const result = await error.response.data

    // update state
    dispatch({
      type: 'SET_ERROR',
      payload: {
        error: true,
        message: result.error
      }
    })
  })
}

// User Logout
export const isLogout = async(dispatch) => {
  setLoading(dispatch, true)
  
  // get uid cookie
  let uid = getCookie('uid')

  await axios.post('/api/v1/auth/logout', { uid: uid }, configPrivate)
  .then(async res => {
    const result = await res.data
    
    if(result.success) {
      // remove cookie
      removeCookie('uid', { path: '/' })
      removeCookie('onRefresh', { path: '/' })
    }

    dispatch({
      type: 'SET_ISAUTHENTICATED',
      payload: false
    })
  }).catch(async error => {
    const result = await error.response.data
  
    // update state
    dispatch({
      type: 'SET_ERROR',
      payload: {
        error: true,
        message: result.error
      }
    })
  })
}

// Check user isAuthenticated
export const isAuthenticated = async(dispatch) => {
  setLoading(dispatch, true)

  // get uid cookie
  let uid = getCookie('uid')

  /** Cookie Checking Style */
  if(uid) {
    dispatch({
      type: 'SET_ISAUTHENTICATED',
      payload: true
    })

    return true
  } else {
    dispatch({
      type: 'SET_ISAUTHENTICATED',
      payload: false
    })

    return false
  }
}

// check user existence (for post like)
export const checkUserExist = async() => {
  console.log('checking user existance')
  console.log(process.env.REACT_APP_ADMIN_ACCESS_COMMENT)
  // get current user:guest cookie (if have any)
  let guest = getCookie('guest')

  if(!guest || guest.ipv4 !== await ipv4()) {
    return { statusRegister: false, uid: null, message: null }
  } else {
    // check user exist
    return await axios.post('/api/v1/auth/register/exist', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC, uid: guest.uid }, config)
    .then(async res => {
      const success = await res.data.success
      const result = await res.data.data
      console.log('okay')
      console.log(result)

      if(!success) {
        return { statusRegister: false, uid: null, message: null }
      }

      // compare to current guest cookie
      if(guest.uid !== result) {
        // set uid cookie to res.data.data & options of path to /
        setCookie('guest', { uid: result, ipv4: await ipv4(), email: '' }, { path: '/' })
      }

      return { statusRegister: true, uid: result, message: null }
    }).catch(async error => {
      console.log('error')
      const result = await error.response.data
      console.log(result)

      return { statusRegister: false, uid: null, message: result.error }
    })
  }
}

// register new user (from like of post/comment)
export const saveNewUser = async(userEmail, nickName, statusOpt) => {
  console.log('saving new user')
  console.log(process.env.REACT_APP_ADMIN_ACCESS_COMMENT)
  // create new user
  return await axios.post('/api/v1/auth/register/comment', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC, nickName: nickName, email: userEmail, statusOpt: statusOpt }, config)
  .then(async res => {
    const result = await res.data.data
    console.log('okay')
    console.log(result)
    // get current user:guest cookie (if have any)
    let guest = getCookie('guest')
    if(!guest || guest.uid !== result || guest.ipv4 !== await ipv4()) {
      // set uid cookie to res.data.data & options of path to /
      setCookie('guest', { uid: result, ipv4: await ipv4(), email: userEmail }, { path: '/' })
    }

    return { statusRegister: true, uid: result, message: null }
  }).catch(async error => {
    console.log('error')
    const result = await error.response.data
    console.log(result)

    return { statusRegister: false, uid: null, message: result.error }
  })
}