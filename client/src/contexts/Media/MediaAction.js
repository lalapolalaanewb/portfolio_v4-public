import axios from 'axios'
import { config, configMultiPart } from '../../Utils/headers/header'
import { getCookie, setCookie } from "../../services/Cookie"
import { ipv4 } from '../../Utils/ipv4/ipv4'

const baseUrl = '/api/v1/medias/private'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Medias
export const getMedias = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.post(baseUrl + '/get', { uid: '' }, config)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_MEDIAS',
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

// Add New Media/s
export const addMedias = async (dispatch, medias) => {
  setLoading(dispatch, true)
  
  const formData = new FormData()
  formData.append('multiFiles', medias)

  await axios.post(baseUrl + '/add/', formData, configMultiPart)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: medias.length === 1 ? 'ADD_MEDIA' : 'ADD_MEDIAS',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: (() => medias.length > 0 ? 'Successfully added new medias.' : 'Successfully added new media.')()
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

// Update A Media Publishment
export const updateMediaPublish = async (dispatch, mediaId, intention) => {
  setLoading(dispatch, true) 
  
  await axios.post(baseUrl + `/update/publish`, { mediaId, intention }, config)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_MEDIA',
      payload: mediaId
    })
    dispatch({
      type: 'ADD_MEDIA',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: (() => intention === 'publish' ? `Successfully publish the media.` : `Successfully unpublish the media.`)()
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

// Update A Media
export const updateMedia = async (dispatch, mediaId, media) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/${mediaId}`, media, config)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_MEDIA',
      payload: mediaId
    })
    dispatch({
      type: 'ADD_MEDIA',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the media.'
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

// Delete A Media
export const deleteMedia = async (dispatch, mediaId) => {
  setLoading(dispatch, true)
  
  await axios.delete(baseUrl + `/delete/${mediaId}`, config)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_MEDIA',
      payload: mediaId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the media.'
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