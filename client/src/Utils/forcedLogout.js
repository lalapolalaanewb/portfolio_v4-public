import { removeCookie } from '../services/Cookie'

const forcedLogout = () => {
  removeCookie('uid', { path: '/' })
  removeCookie('onRefresh', { path: '/' })
}

export default forcedLogout