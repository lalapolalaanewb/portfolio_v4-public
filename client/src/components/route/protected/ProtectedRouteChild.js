import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated, setLoading } from '../../../contexts/Auth/AuthAction'
import { useAuth } from '../../../contexts/Auth/AuthState'
import useAuthentication from '../../../hooks/useAuthentication'

const ProtectedRouteChild = ({ component: Component, ...rest }) => {
  const [authState, authDispatch] = useAuth()
  const { authenticated, loading } = authState

  // check if user is authenticated
  // useEffect(() => {
  //   (async() => {
  //     await isAuthenticated(authDispatch)
  //     setLoading(authDispatch, false)
  //   })();
  // }, [authDispatch])
  const { isAuth } = useAuthentication(authDispatch)

  return (
    <Route 
      {...rest} render={
        props => {
          if(loading) return <div className="lds-hourglass"></div>
          if(!isAuth) return <Component {...props} />
          // if(!authenticated) return <Component {...props} />
          else return <Redirect to={
            {
              pathname: "/pfv4-admin",
              state: { from: props.location }
            }
          } />
        }
      } 
    />
  )
}

export default ProtectedRouteChild