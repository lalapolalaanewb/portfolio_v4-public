import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../../contexts/Auth/AuthState'
import { isAuthenticated, setLoading } from '../../../contexts/Auth/AuthAction'
import { getCookie } from '../../../services/Cookie'

const ProtectedRouteChildLogin = ({ component: Component, ...rest }) => {
  const [authState, authDispatch] = useAuth()
  const { authenticated, loading } = authState

  // check if user is authenticated
  useEffect(() => {
    (async() => {
      await isAuthenticated(authDispatch)
      setLoading(authDispatch, false)
    })();
  }, [])

  return (
    <Route
      {...rest} render={
        props => {
          if(loading) return <div className="lds-hourglass"></div>
          if(!authenticated) return <Component {...props} />
          else {
            let url = getCookie('onRefresh')
            
            return <Redirect exact to={{
              pathname: url !== '' ? url : '/pfv4-admin/dashboard',
              state: { from: props.location }
            }} />
          }
        }
      } 
    />
  )
}

export default ProtectedRouteChildLogin