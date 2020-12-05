import React from 'react'
import { ProjectsState } from '../../../contexts/Projects/Public/ProjectsState'
import UnprotectedRouteChild from './UnprotectedRouteChild'

const UnprotectedRouteParentProjects = ({ ...rest }) => {
  return (
    <ProjectsState>
      <UnprotectedRouteChild {...rest} />
    </ProjectsState>
  )
}

export default UnprotectedRouteParentProjects