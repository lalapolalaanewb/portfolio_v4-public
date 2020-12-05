import React from 'react'
import { UserState } from '../../../contexts/User/Public/UserState'
import UnprotectedRouteChild from './UnprotectedRouteChild'

const UnprotectedRouteParentAbout = ({ ...rest }) => {
  return (
    <UserState>
      <UnprotectedRouteChild {...rest} />
    </UserState>
  )
}

export default UnprotectedRouteParentAbout