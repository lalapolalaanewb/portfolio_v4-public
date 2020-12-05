import React from 'react'
import { TechnologyState } from '../../../contexts/Technology/TechnologyState'
import ProtectedRouteChild from './ProtectedRouteChild'

const ProtectedRouteParentTechs = ({ ...rest }) => {
  return (
    <TechnologyState>
      <ProtectedRouteChild {...rest} />
    </TechnologyState>
  )
}

export default ProtectedRouteParentTechs