import React from 'react'
import { MailState } from '../../../contexts/Mail/Public/MailState'
import UnprotectedRouteChild from './UnprotectedRouteChild'

const UnprotectedRouteParentMail = ({ ...rest }) => {
  return (
    <MailState>
      <UnprotectedRouteChild {...rest} />
    </MailState>
  )
}

export default UnprotectedRouteParentMail