import { getCookie } from '../../services/Cookie'

/** get current uid */
const getUid = () => {
  let uid = getCookie('uid')
  return uid
}

export const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const configPrivate = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: (() => {
      let uid = getUid()
      return `Bearer ${uid}`
    })()
  }
}

export const configMultiPart = {
  headers: { 
    "Content-Type": "multipart/form-data" 
  }
}

export const configMultiPartPrivate = {
  headers: { 
    "Content-Type": "multipart/form-data",
    Authorization: (() => {
      let uid = getUid()
      return `Bearer ${uid}`
    })() 
  } 
}