import React from 'react'
import { PolicyState } from '../../../contexts/Policy/Public/PolicyState'
import UnprotectedRouteChild from './UnprotectedRouteChild'

const UnprotectedRouteParentPolicy = ({ ...rest }) => {
  return (
    <PolicyState>
      <UnprotectedRouteChild {...rest} />
    </PolicyState>
  )
}

export default UnprotectedRouteParentPolicy