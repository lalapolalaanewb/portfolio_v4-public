import React from 'react'
import { ContactState } from '../../../contexts/Contact/ContactState'
import ProtectedRouteChild from './ProtectedRouteChild'

const ProtectedRouteParentContact = ({ ...rest }) => {
  return (
    <ContactState>
      <ProtectedRouteChild {...rest} />
    </ContactState>
  )
}

export default ProtectedRouteParentContact