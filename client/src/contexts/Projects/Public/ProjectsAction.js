import axios from 'axios'
import { config } from '../../../Utils/headers/header'
import { getCookie, setCookie } from "../../../services/Cookie"
import { ipv4 } from '../../../Utils/ipv4/ipv4'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { error: error.status, message: error.message } })

// Get Projects
export const getProjects = async (dispatch) => {
  setLoading(dispatch, true)
  
  // do fetch
  await axios.post('/api/v1/projects', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC }, config)
  .then(async res => {
    const result = await res.data.data
    console.log(result)
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

    dispatch({
      type: 'SET_ERROR',
      payload: {
        status: !result.success,
        message: result.error
      }
    })
  })
}

// Update Post Likes
export const updateProjectLikeCount = async( dispatch, projectId, projectLikeCount, projectOpt) => {
  setLoading(dispatch, true)

  // get current user: guest cookie
  let guest = getCookie('guest')

  if(!guest) {
    console.log('update like comment: xde cookie')
    return dispatch({
      type: 'SET_ERROR',
      payload: {
        status: true,
        message: 'Having trouble updating liking a project. Please try again later.'
      }
    })
  }

  // do fecth call here
  // to Model - Likestatus: to check whether the user/guest already leave a like this postId
  // await axios.post('/api/v1/projects/public/update', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC, ipv4: await ipv4(), projectId: projectId, projectLikeCount: projectLikeCount}, config)
  // .then(async res => {
  //   const result = await res.data.data

  //   // dispatch({
  //   //   type: 'SET_POST',
  //   //   payload: result
  //   // })
  // })
  // .catch(async error => {
  //   const result = await error.response.data

  //   dispatch({
  //     type: 'SET_ERROR',
  //     payload: {
  //       error: true,
  //       message: result.error
  //     }
  //   })
  // })

  // projects.find(proj => {
  //   if(proj._id === projectId) {
  //     if(projectOpt === 'add') proj.like = proj.like + 1
  //     else proj.like = proj.like - 1
  //   }
  // })
}