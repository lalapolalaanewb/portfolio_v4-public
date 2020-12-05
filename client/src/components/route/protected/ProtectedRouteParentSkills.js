import React from 'react'
import { SkillState } from '../../../contexts/Skill/Private/SkillState'
import ProtectedRouteChild from './ProtectedRouteChild'

const ProtectedRouteParentSkills = ({...rest}) => {
  return (
    <SkillState>
      <ProtectedRouteChild {...rest} />
    </SkillState>
  )
}

export default ProtectedRouteParentSkills