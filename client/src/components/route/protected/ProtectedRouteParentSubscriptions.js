import React from 'react'
import { SubscriptionState } from '../../../contexts/Subscription/Private/SubscriptionState'
import ProtectedRouteChild from './ProtectedRouteChild'

const ProtectedRouteParentSubscriptions = ({ ...rest }) => {
  return (
    <SubscriptionState>
      <ProtectedRouteChild {...rest} />
    </SubscriptionState>
  )
}

export default ProtectedRouteParentSubscriptions