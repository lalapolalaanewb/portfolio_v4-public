import axios from 'axios'
import { config } from '../../../Utils/headers/header'
import { getCookie, setCookie } from "../../../services/Cookie"
import { ipv4 } from '../../../Utils/ipv4/ipv4'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { error: error.status, message: error.message } })

// Get Skills
export const getSkills = async (dispatch) => {
  setLoading(dispatch, true)

  // fetch projects
  await axios.post('/api/v1/skills', { key: process.env.REACT_APP_ADMIN_ACCESS_PUBLIC }, config)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'SET_SKILLS',
      payload: result
    })

   // sort out filter list from projects
   let allTechs = []
  
   result.forEach(skill => {
    skill.techs.forEach(tech => {
      // save the tech if categoriesProject array still empty
      if(allTechs.length === 0) allTechs.push({ _id: tech._id, name: tech.name })
      else {
        // check if category already exist in the array, if not , then save
        if(allTechs.map(cat => cat._id).indexOf(tech._id) === -1) allTechs.push({ _id: tech._id, name: tech.name })
      }
    })
   })
 
   dispatch({
     type: 'SET_TECHLIST',
     payload: allTechs.sort((a, b) => a.name < b.name ? -1 : 1)
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