import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'

const AlertMessage = ({
  severity, title,
  dispatch, message,
  setStatus
}) => {
  const classes = useStyles()

  return (
    <Alert severity={severity}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => setStatus(dispatch, {status: false, message: ''})}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      classes={{
        root: classes.rootAlert,
        action: classes.actionAlert
      }}
    >
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  )
}

export default AlertMessage

const useStyles = makeStyles(theme => ({
  rootAlert: {
    '& $actionAlert': {
      alignItems: 'start'
    }
  },
  actionAlert: {},
}))