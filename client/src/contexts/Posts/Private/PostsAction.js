import axios from 'axios'
import { configPrivate, configMultiPartPrivate } from '../../../Utils/headers/header'

const baseUrl = '/api/v1/posts/private'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Posts
export const getPosts = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.get(baseUrl + '/get', configPrivate)
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
    
    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}

// Add New Post
export const addPost = async (dispatch, post) => {
  setLoading(dispatch, true)
  
  const formData = new FormData()
  formData.append('title', post.title)
  formData.append('excerpt', post.excerpt)
  formData.append('tech', post.tech)
  formData.append('description', post.desc)
  formData.append('file', post.img)

  await axios.post(baseUrl + '/add', formData, configMultiPartPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_POST',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new post.'
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

// Change/Update Post Image
export const updatePostImg = async (dispatch, postId, img, imgSrc) => {
  setLoading(dispatch, true)
  
  const formData = new FormData()
  formData.append('postId', postId)
  formData.append('imgSrc', imgSrc)
  formData.append('file', img)

  await axios.post(baseUrl + '/update/image', formData, configMultiPartPrivate)
  .then(async res => {
    const result = await res.data.data
    
    // update posts
    dispatch({
      type: 'DELETE_POST',
      payload: postId
    })
    dispatch({
      type: 'ADD_POST',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update new post img.'
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

// Update A Post Publishment
export const updatePostPublish = async (dispatch, postId, intention) => {
  setLoading(dispatch, true) 
  
  await axios.post(baseUrl + `/update/publish`, { postId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_POST',
      payload: postId
    })
    dispatch({
      type: 'ADD_POST',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: (() => intention === 'publish' ? `Successfully publish the post.` : `Successfully unpublish the post.`)()
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

// Update A Post
export const updatePost = async (dispatch, postId, post) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/${postId}`, post, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_POST',
      payload: postId
    })
    dispatch({
      type: 'ADD_POST',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the post.'
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

// Delete A Post
export const deletePost = async (dispatch, postId, creator) => {
  setLoading(dispatch, true)
  
  await axios.post(`/api/v1/posts/private/delete/${postId}`, { creator }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_POST',
      payload: postId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the post.'
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