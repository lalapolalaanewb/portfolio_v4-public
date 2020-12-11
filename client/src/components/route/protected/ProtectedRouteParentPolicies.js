import React from 'react'
import { PolicyState } from '../../../contexts/Policy/Private/PolicyState'
import ProtectedRouteChild from './ProtectedRouteChild'

const ProtectedRouteParentPolicies = ({ ...rest }) => {
  return (
    <PolicyState>
      <ProtectedRouteChild {...rest} />
    </PolicyState>
  )
}

export default ProtectedRouteParentPolicies