import React from 'react'
import ProtectedRouteChild from './ProtectedRouteChild'

const ProtectedRouteParentProfile = ({ ...rest }) => {
  return (
    <>
      <ProtectedRouteChild {...rest} />
    </>
  )
}

export default ProtectedRouteParentProfile