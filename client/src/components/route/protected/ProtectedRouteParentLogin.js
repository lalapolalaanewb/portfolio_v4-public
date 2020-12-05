import React from 'react'
import ProtectedRouteChildLogin from './ProtectedRouteChildLogin'

const ProtectedRouteParentLogin = ({ ...rest }) => {
  return (
    <>
      <ProtectedRouteChildLogin {...rest} />
    </>
  )
}

export default ProtectedRouteParentLogin