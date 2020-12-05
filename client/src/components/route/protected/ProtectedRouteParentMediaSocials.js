import React from 'react'
import { MediaSocialState } from '../../../contexts/MediaSocial/MediaSocialState'
import ProtectedRouteChild from './ProtectedRouteChild'

const ProtectedRouteParentMediaSocials = ({ ...rest }) => {
  return (
    <MediaSocialState>
      <ProtectedRouteChild {...rest} />
    </MediaSocialState>
  )
}

export default ProtectedRouteParentMediaSocials