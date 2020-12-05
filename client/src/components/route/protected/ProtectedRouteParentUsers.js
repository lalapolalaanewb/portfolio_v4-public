import React from 'react'
import { UsersState } from '../../../contexts/Users/Private/UsersState'
import ProtectedRouteChild from './ProtectedRouteChild'

const ProtectedRouteParentUsers = ({ ...rest }) => {
  return (
    <UsersState>
      <ProtectedRouteChild {...rest} />
    </UsersState>
  )
}

export default ProtectedRouteParentUsers