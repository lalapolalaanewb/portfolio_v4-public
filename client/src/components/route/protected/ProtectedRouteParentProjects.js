import React from 'react'
import { ProjectsState } from '../../../contexts/Projects/Private/ProjectsState'
import ProtectedRouteChild from './ProtectedRouteChild'

const ProtectedRouteParentProjects = ({...rest}) => {
  return (
    <ProjectsState>
      <ProtectedRouteChild {...rest} />
    </ProjectsState>
  )
}

export default ProtectedRouteParentProjects