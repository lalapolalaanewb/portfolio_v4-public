import React from 'react'
import { MediaState } from '../../../contexts/Media/MediaState'
import ProtectedRouteChild from './ProtectedRouteChild'

export const ProtectedRouteParentMedias = ({ ...rest }) => {
  return (
    <MediaState>
      <ProtectedRouteChild {...rest} />
    </MediaState>
  )
}

export default ProtectedRouteParentMedias