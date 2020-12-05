import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const Content = ({children}) => {
  const classes = useStyles()

  return (
    <div className={classes.section}>
      <div className={classes.wrapper}>
        {children}
      </div>
    </div>
  )
}

export default Content

const useStyles = makeStyles(theme => ({
  section:{
    position: 'relative',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    padding: theme.spacing(3),
    minHeight: '100vh'
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    width: '100%',
    // maxWidth: '1300px',
    [theme.breakpoints.down('md')]: {
      padding: '0 10px'
    },
  },
}))