import axios from 'axios'
import { configPrivate } from '../../Utils/headers/header'

const baseUrl = '/api/v1/contacts/private'

// Set Loading
export const setLoading = (dispatch, status) => dispatch({ type: 'SET_LOADING', payload: status })

// Set Error
export const setError = (dispatch, error) => dispatch({ type: 'SET_ERROR', payload: { status: error.status, message: error.message } })

// Set Success
export const setSuccess = (dispatch, success) => dispatch({ type: 'SET_SUCCESS', payload: { status: success.status, message: success.message } })

// Get Contact
export const getContact = async (dispatch) => {
  setLoading(dispatch, true)

  // do fetch
  await axios.get(baseUrl + '/get', configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'SET_CONTACT',
      payload: (() => {
        if(result === null) return {
          senderGmail: '',
          senderEmail: '',
          clientId: '',
          clientSecret: '',
          refreshToken: ''
        } 
        else return {
          ...result,
          senderGmail: result.senderGmail,
          senderEmail: result.senderEmail,
          clientId: result.clientId,
          clientSecret: result.clientSecret,
          refreshToken: result.refreshToken
        }
      })()
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

// Add New Contact
export const addContact = async (dispatch, contact) => {
  setLoading(dispatch, true)
  
  await axios.post(baseUrl + '/add/', contact, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'SET_CONTACT',
      payload: {
        ...result,
        senderGmail: result.senderGmail,
        senderEmail: result.senderEmail,
        clientId: result.clientId,
        clientSecret: result.clientSecret,
        refreshToken: result.refreshToken
      }
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully added new contact.'
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

// Update A Contact Publishment
export const updateContactPublish = async (dispatch, contactId, intention) => {
  setLoading(dispatch, true) 
  
  await axios.post(baseUrl + `/update/publish`, { contactId, intention }, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'SET_CONTACT',
      payload: {
        ...result,
        senderGmail: result.senderGmail,
        senderEmail: result.senderEmail,
        clientId: result.clientId,
        clientSecret: result.clientSecret,
        refreshToken: result.refreshToken
      }
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: (() => intention === 'publish' ? `Successfully publish the contact.` : `Successfully unpublish the contact.`)()
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

// Update A Contact
export const updateContact = async (dispatch, contactId, contact) => {
  setLoading(dispatch, true)

  await axios.post(baseUrl + `/update/${contactId}`, contact, configPrivate)
  .then(async res => {
    const result = await res.data.data

    // update state
    dispatch({
      type: 'SET_CONTACT',
      payload: {
        ...result,
        senderGmail: result.senderGmail,
        senderEmail: result.senderEmail,
        clientId: result.clientId,
        clientSecret: result.clientSecret,
        refreshToken: result.refreshToken
      }
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully update the contact.'
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

// Delete A Contact
export const deleteContact = async (dispatch, contactId) => {
  setLoading(dispatch, true)
  
  await axios.delete(baseUrl + `/delete/${contactId}`, configPrivate)
  .then(async res => {
    const result = await res.data.data

    dispatch({
      type: 'SET_CONTACT',
      payload: {
        senderGmail: '',
        senderEmail: '',
        clientId: '',
        clientSecret: '',
        refreshToken: ''
      }
    })

    // update success
    setSuccess(dispatch, {
      status: true,
      message: 'Successfully delete the contact.'
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