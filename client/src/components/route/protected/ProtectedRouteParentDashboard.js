import React from 'react'
import { DashboardState } from '../../../contexts/Dashboard/DashboardState'
import ProtectedRouteChild from './ProtectedRouteChild'

const ProtectedRouteParentDashboard = ({ ...rest }) => {
  return (
    <DashboardState>
      <ProtectedRouteChild {...rest} />
    </DashboardState>
  )
}

export default ProtectedRouteParentDashboard