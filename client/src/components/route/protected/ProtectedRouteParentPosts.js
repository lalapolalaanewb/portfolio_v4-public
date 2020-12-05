import React from 'react'
import { PostsState } from '../../../contexts/Posts/Private/PostsState'
import ProtectedRouteChild from './ProtectedRouteChild'

const ProtectedRouteParentPosts = ({ ...rest }) => {
  return (
    <PostsState>
      <ProtectedRouteChild {...rest} />
    </PostsState>
  )
}

export default ProtectedRouteParentPosts