import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const Headline = ({headline, subHeadline}) => {
  const classes = useStyles()

  return (
    <div className={classes.headline}>
      <Typography variant="h5" style={{marginRight: '0.5rem'}}>
        {headline}
      </Typography>
      <Typography variant="body" color="textSecondary">
        {subHeadline}
      </Typography>
    </div>
  )
}

export default Headline

const useStyles = makeStyles(theme => ({
  headline: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    borderBottom: '5px solid ' + theme.palette.secondary.main,
    padding: '0.5rem',
    width: '100%',
    marginBottom: theme.spacing(3)
  },
}))