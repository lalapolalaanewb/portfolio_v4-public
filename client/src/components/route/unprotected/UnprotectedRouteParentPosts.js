import React from 'react'
import { PostsState } from '../../../contexts/Posts/Public/PostsState'
import UnprotectedRouteChild from './UnprotectedRouteChild'

const UnprotectedRouteParentPosts = ({ ...rest }) => {
  return (
    <PostsState>
      <UnprotectedRouteChild {...rest} />
    </PostsState>
  )
}

export default UnprotectedRouteParentPosts