import React from 'react'
import { Route } from 'react-router-dom'

const UnprotectedRouteChild = ({ component: Component, ...rest }) => {
  return (
    <Route 
      {...rest} render={
        props => {
          return <Component {...props} />
        }
      } 
    />
  )
}

export default UnprotectedRouteChild