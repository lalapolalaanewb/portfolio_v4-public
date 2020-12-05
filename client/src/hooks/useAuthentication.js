import React, { useState, useEffect } from 'react'
import { setLoading, isAuthenticated } from '../contexts/Auth/AuthAction';

const useAuthentication = (dispatch) => {
  const [isAuth, setIsAuth] = useState(false)

  // check if user is authenticated
  useEffect(() => {
    (async() => {
      let auth = await isAuthenticated(dispatch)
      setIsAuth(auth)
      setLoading(dispatch, false)
    })();
  }, [])

  return { isAuth: isAuth }
}

export default useAuthentication
