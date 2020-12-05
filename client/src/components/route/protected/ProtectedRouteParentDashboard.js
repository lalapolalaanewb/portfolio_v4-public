import React from 'react'
import ProtectedRouteChild from './ProtectedRouteChild'

const ProtectedRouteParentDashboard = ({ ...rest }) => {
  return (
    <>
      <ProtectedRouteChild {...rest} />
    </>
  )
}

export default ProtectedRouteParentDashboard