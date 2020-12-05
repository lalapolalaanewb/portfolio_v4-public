import axios from 'axios'
import { config } from '../../../Utils/headers/header'
import { getCookie, setCookie } from "../../../services/Cookie"
import { ipv4 } from '../../../Utils/ipv4/ipv4'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { error: error.status, message: error.message } })

// Get Projects
export const getPosts = async (dispatch) => {
  setLoading(dispatch, true)

  // fetch projects
  await axios.post('/api/v1/posts', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC }, config)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'SET_POSTS',
      payload: result
    })

    // sort out filter list from projects
    let categoriesPost = []

    result.forEach(post => {
      // save the tech if categoriesProject array still empty
      if(categoriesPost.length === 0) categoriesPost.push({ _id: post.tech._id, name: post.tech.name })
      else {
        // check if category already exist in the array, if not , then save
        if(categoriesPost.map(cat => cat._id).indexOf(post.tech._id) === -1) categoriesPost.push({ _id: post.tech._id, name: post.tech.name })
      }
    })

    dispatch({
      type: 'SET_TECHLIST',
      payload: categoriesPost
    })
  })
  .catch(async error => {
    const result = await error.response.data

    dispatch({
      type: 'SET_ERROR',
      payload: {
        status: true,
        message: result.error
      }
    })
  })
}