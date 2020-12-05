import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../../contexts/Auth/AuthState'

const ProtectedRouteChildLogin = ({ component: Component, ...rest }) => {
  const [authState, authDispatch] = useAuth()
  const { authenticated } = authState

  return (
    <Route
      {...rest} render={
        props => {
          if(!authenticated) return <Component {...props} />
          else return <Redirect exact to={{
            pathname: "/pfv4-admin/dashboard",
            state: { from: props.location }
          }} />
        }
      } 
    />
  )
}

export default ProtectedRouteChildLogin