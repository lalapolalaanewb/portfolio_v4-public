import React from 'react'
import { PostState } from '../../../contexts/Post/Public/PostState'
import UnprotectedRouteChild from './UnprotectedRouteChild'

const UnprotectedRouteParentPost = ({ ...rest }) => {
  return (
    <PostState>
      <UnprotectedRouteChild {...rest} />
    </PostState>
  )
}

export default UnprotectedRouteParentPost