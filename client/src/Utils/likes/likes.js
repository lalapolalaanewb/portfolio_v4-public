import { getCookie, setCookie, removeCookie } from '../../services/Cookie'
import { ipv4 } from '../ipv4/ipv4'

/** check guest existance */
export const checkGuestExist = async() => {
  let guest = getCookie('guest')

  if(!guest) {
    setCookie('guest', {
      user: await ipv4(),
      likes: {
        posts: [],
        projects: []
      }
    }, { path: '/' })
    
    return getCookie('guest')
  }
  else return guest
}

/** update guest info */
export const updateGuestInfo = (guest) => {
  // set new updated guest info
  setCookie('guest', guest, { path: '/' })
}