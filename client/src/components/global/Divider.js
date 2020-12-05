import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

export const DividerBlank = () => {
  const classes = useStyles()

  return (
    <div className={classes.space} />
  )
}

const useStyles = makeStyles(theme => ({
  space: {
    height: theme.spacing(5)
  }
}))