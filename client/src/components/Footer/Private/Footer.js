import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const Footer = ({ open }) => {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <Typography variant="body1" className={open ? classes.toLeft : classes.typography} >
        Copyright© <span className={classes.nickName}>Lalapolalaa Newb</span> @ {(new Date()).getFullYear()}. All Rights Reserved
      </Typography>
    </div>
  )
}

export default Footer

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.darken.main,
  },
  typography: {
    textAlign: 'center',
  },
  toLeft: {
    textAlign: 'left'
  },
  nickName: {
    color: theme.palette.secondary.main
  },
}))