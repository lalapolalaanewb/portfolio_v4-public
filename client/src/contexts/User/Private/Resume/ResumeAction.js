import axios from 'axios'
import { configPrivate, configMultiPartPrivate } from '../../../../Utils/headers/header'

const baseUrl = '/api/v1/users/private/profile/resume'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Resumes
export const getResumes = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.get(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data
    // console.log(result.resumes)
    dispatch({
      type: 'SET_RESUMES',
      payload: result.resumes 
    })

    dispatch({
      type: 'SET_PROJECTS',
      payload: (() => {
        let published = result.projects.filter(state => state.status === 1)
        return published.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      })()
    })

    dispatch({
      type: 'SET_EDUS',
      payload: (() => {
        let published = result.educations.filter(state => state.status === 1)
        return published.sort((a, b) => a.course < b.course ? -1 : 1)
      })()
    })

    dispatch({
      type: 'SET_JOBS',
      payload: result.jobs.sort((a, b) => a.name < b.name ? -1 : 1)
    })

    dispatch({
      type: 'SET_CREATOR',
      payload: result._id 
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

// Add New Resume
export const addResume = async (dispatch, resume) => {
  setLoading(dispatch, true)
  
  const formData = new FormData()
  formData.append('website', resume.website)
  formData.append('title', resume.title)
  formData.append('description', resume.desc)
  formData.append('techs', resume.techs)
  formData.append('projects', resume.projs)
  formData.append('educations', resume.edus)
  formData.append('jobs', resume.jobs)
  formData.append('creator', resume.creator)
  formData.append('file', resume.pdf)

  await axios.post(baseUrl + '/add', formData, configMultiPartPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_RESUME',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new resume.'
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

// Update A Resume
export const updateResume = async (dispatch, resumeId, resume) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update`, { resumeId, resume }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'DELETE_RESUME',
      payload: resumeId
    })
    dispatch({
      type: 'ADD_RESUME',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the resume.'
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

// Update A Resume Pdf
export const updateResumePdf = async (dispatch, resumeId, pdf) => {
  setLoading(dispatch, true)

  const formData = new FormData()
  formData.append('resumeId', resumeId)
  formData.append('pdfSrc', pdf.old)
  formData.append('file', pdf.new)

  await axios.post(baseUrl + `/update/pdf`, formData, configMultiPartPrivate)
  .then(async res => {
    const result = await res.data.data

    // update posts
    dispatch({
      type: 'DELETE_RESUME',
      payload: resumeId
    })
    dispatch({
      type: 'ADD_RESUME',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the resume.'
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

// Update A Resume Publish
export const updateResumePublish = async (dispatch, resumeId, intention) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/publish`, { resumeId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'DELETE_RESUME',
      payload: resumeId
    })
    dispatch({
      type: 'ADD_RESUME',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the resume publish status.'
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

// Delete A Resume
export const deleteResume = async (dispatch, resumeId, creator) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/delete`, { resumeId, creator }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_RESUME',
      payload: resumeId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the resume.'
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