import React from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button, List, ListItem } from '@material-ui/core'

export const Section = ({
  name,
  abouts,
  jobs
}) => {
  const classes = useStyles()
  const history = useHistory()

  // handle page navigation
  const handlePageNav = (purpose, link) => {
    return purpose === 'local' ? history.push('/' + link) : window.open(link)
  }

  return abouts?.length > 0 && abouts.map(about => {
    if(about.status === 1) return (
      <div key={about._id} className={classes.hero__section}>
        <div className={classes.container}>
          <div className={classNames(classes.row, classes.heroRow)}
            style={{display: 'flex', flexDirection: about.imgPosition === 'start' ? 'row-reverse' : 'row'}}
          >
            <div className={classes.col}>
              <div className={about.imgPosition === 'start' ? classes.heroTextWrapper : classNames(classes.heroTextWrapper, classes.heroTextWrapperLeft)}>
                <Typography className={classes.topLine}>
                  {about.title}
                </Typography>
                <div className={classes.titles}>
                  <Typography variant="h1" className={classes.heading}>
                    {`${name.firstName} ${name.lastName}`}
                  </Typography>
                  {jobs?.length > 0 && (
                    <List className={classNames(classes.jobsContainer, classes.zeroPadding, classes.zeroMargin)}>
                      {jobs.map(job => {
                        if(job.status === 1) return (
                          <ListItem key={job._id} className={classNames(classes.zeroPadding, classes.zeroMargin)}>
                            <Typography variant="body1" className={classNames(classes.jobName, classes.zeroPadding, classes.zeroMargin)}>
                              {job.name}
                            </Typography>
                          </ListItem>
                        )
                      })}
                    </List>
                  )}
                </div>
                <Typography className={classes.heroDesc}>
                  {about.description}
                </Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large" 
                  className={classes.btnWide}
                  onClick={() => handlePageNav(about.btnPurpose, about.btnLink)}
                >
                  {about.btnLabel}
                </Button>
              </div>
            </div>
            <div className={classNames(classes.col, classes.noShowMobile)}>
              <div className={about.imgPosition === 'start' ? classNames(classes.heroImgWrapper, classes.heroImgWrapperRight) : classes.heroImgWrapper}>
                <img src={`/images/${about.imgSrc}`} alt={about.title} className={classNames(classes.img, classes.heroImg)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })
}

const useStyles = makeStyles((theme) => ({
  hero__section: {
    width: '100%',
    padding: '8rem 0',
    [theme.breakpoints.down('sm')]: {
      padding: '10rem 0',
    }
  },
  heroRow: {
    alignItems: 'center'
  },
  row: {
    display: 'flex',
    marginRight: '-0.9375rem',
    marginBottom: '-0.9375rem',
    marginLeft: '-0.9375rem',
    flexWrap: 'wrap',
    alignContent: 'stretch',
  },
  col: {
    marginBottom: '0.9375rem',
    paddingRight: '0.9375rem',
    paddingLeft: '0.9375rem',
    flex: 1,
    maxWidth: '50%',
    flexBasis: '50%',
    '@media (max-width: 48rem)': {
      maxWidth: '100%',
      flexBasis: '100%',
    }
  },
  heroTextWrapper: {
    maxWidth: '33.75rem',
    paddingTop: 0,
    paddingBottom: '3.75rem',
  },
  heroTextWrapperLeft: {
    float: 'right',
    '@media (max-width: 48rem)': {
      paddingBottom: '4.0625rem',
      float: 'left',
    }
  },
  topLine: {
    color: theme.palette.error.main,
    fontSize: '1rem',
    lineHeight: '1rem',
    fontWeight: 700,
    letterSpacing: '0.0875rem',
    textTransform: 'uppercase',
    marginBottom: '1.5rem',
  },
  titles: {
    display: 'flex',
    flexFlow: 'row wrap', 
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginBottom: '1.5rem',
  },
  heading: {
    margin: '0 0.5rem 0 0',
    fontSize: '3rem',
    lineHeight: 1.1,
    fontWeight: 600,
  },
  zeroPadding: {
    padding: 0,
  },
  zeroMargin: {
    margin: 0,
  },
  jobsContainer: {
    overflow: 'auto', 
    maxHeight: '52px',
  },
  jobName: {
    fontWeight: 300,
  },
  heroDesc: {
    maxWidth: '27.5rem',
    marginBottom: '2.1875rem',
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
  },
  heroImgWrapper: {
    maxWidth: '34.6875rem',
    width: '100%',
  },
  heroImgWrapperRight: {
    float: 'right',
  },
  heroImg: {
    maxWidth: '95%',
    margin: '0 0 0 0.625rem',
    paddingRight: 0,
  },
  img: {
    border: 0,
    maxWidth: '100%',
    verticalAlign: 'middle',
    display: 'inline-block',
  },
  container: {
    '@media (max-width: 61.9375rem)': {
      paddingRight: '1.875rem',
      paddingLeft: '1.875rem',
    }
  },
  btnWide: {
    width: '100%',
    color: theme.palette.common.white
  },
  noShowMobile: {
    '@media (max-width: 48rem)': {
      display: 'none'
    }
  }
}))