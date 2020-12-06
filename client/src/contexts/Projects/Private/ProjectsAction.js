import axios from 'axios'
import { config, configMultiPart } from '../../../Utils/headers/header'
import { getCookie, setCookie } from "../../../services/Cookie"
import { ipv4 } from '../../../Utils/ipv4/ipv4'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Projects
export const getProjects = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.post('/api/v1/projects/private/get', { uid: '' }, config)
  .then(async res => {
    const result = await res.data.data
    
    dispatch({
      type: 'SET_PROJECTS',
      payload: result 
    })
  
    // sort out filter list from projects
    let categoriesProject = []
  
    result.forEach(project => {
      project.techs.forEach(tech => {
        // save the tech if categoriesProject array still empty
        if(categoriesProject.length === 0) categoriesProject.push({ _id: tech._id, name: tech.name })
        else {
          // check if category already exist in the array, if not , then save
          if(categoriesProject.map(cat => cat._id).indexOf(tech._id) === -1) categoriesProject.push({ _id: tech._id, name: tech.name })
        }
      })
    })
  
    dispatch({
      type: 'SET_TECHLIST',
      payload: categoriesProject
    })
  })
  .catch(async error => {
    const result = await error.response.data
    console.log(result.success)
    console.log(result.error)

    setError(dispatch, {
      status: true,
      message: result.error
    })
  })
}

// Add New Project
export const addProject = async (dispatch, project) => {
  setLoading(dispatch, true)

  const formData = new FormData()
  formData.append('name', project.name)
  formData.append('www', project.www)
  formData.append('code', project.code)
  formData.append('techs', project.techs)
  formData.append('description', project.desc)
  formData.append('subDescription', project.subDesc)
  formData.append('file', project.imgSrc)

  await axios.post('/api/v1/projects/private/add/', formData, configMultiPart)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'ADD_PROJECT',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new project.'
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

// Change/Update Project Image
export const updateProjectImg = async (dispatch, projectId, img, imgSrc) => {
  setLoading(dispatch, true)
  
  const formData = new FormData()
  formData.append('projectId', projectId)
  formData.append('imgSrc', imgSrc)
  formData.append('file', img)

  await axios.post('/api/v1/projects/private/update/image', formData, configMultiPart)
  .then(async res => {
    const result = await res.data.data

    // update projects
    dispatch({
      type: 'DELETE_PROJECT',
      payload: projectId
    })
    dispatch({
      type: 'ADD_PROJECT',
      payload: result
    })
    
    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update new project img.'
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

// Update A Project Publishment
export const updateProjectPublish = async (dispatch, projectId, intention) => {
  setLoading(dispatch, true) 
  
  await axios.post(`/api/v1/projects/private/update/publish`, { projectId, intention }, config)
  .then(async res => {
    const result = await res.data.data
    
    // update projects
    dispatch({
      type: 'DELETE_PROJECT',
      payload: projectId
    })
    dispatch({
      type: 'ADD_PROJECT',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: (() => intention === 'publish' ? `Successfully publish the project.` : `Successfully unpublish the project.`)()
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

// Update A Project
export const updateProject = async (dispatch, projectId, project) => {
  setLoading(dispatch, true)

  await axios.post(`/api/v1/projects/private/update/${projectId}`, project, config)
  .then(async res => {
    const result = await res.data.data

    // update projects
    dispatch({
      type: 'DELETE_PROJECT',
      payload: projectId
    })
    dispatch({
      type: 'ADD_PROJECT',
      payload: result
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the project.'
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

// Delete A Project
export const deleteProject = async (dispatch, projectId, creator) => {
  setLoading(dispatch, true)

  await axios.post(`/api/v1/projects/private/delete/${projectId}`, { creator }, config)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'DELETE_PROJECT',
      payload: projectId
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the project.'
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