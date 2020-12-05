import React from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'

export const Section = ({ homes }) => {
  const classes = useStyles()
  const history = useHistory()

  // handle page navigation
  const handlePageNav = (purpose, link) => {
    return purpose === 'local' ? history.push('/' + link) : window.open(link)
  }

  return homes?.length > 0 && homes.map(home => {
    if(home.status === 1) return (
      <div key={home._id} className={classes.hero__section}>
        <div className={classes.container}>
          <div className={classNames(classes.row, classes.heroRow)}
            style={{display: 'flex', flexDirection: home.imgPosition === 'start' ? 'row-reverse' : 'row'}}
          >
            <div className={classes.col}>
              <div className={home.imgPosition === 'start' ? classes.heroTextWrapper : classNames(classes.heroTextWrapper, classes.heroTextWrapperLeft)}>
                <Typography className={classes.topLine}>
                  {home.topline}
                </Typography>
                <Typography variant="h1" className={classes.heading}>
                  {home.headline}
                </Typography>
                <Typography className={classes.heroSubtitle}>
                  {home.description}
                </Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large" 
                  className={classes.btnWide}
                  onClick={() => handlePageNav(home.btnPurpose, home.btnLink)}
                >
                  {home.btnLabel}
                </Button>
              </div>
            </div>
            <div className={classes.col}>
              <div className={home.imgPosition === 'start' ? classNames(classes.heroImgWrapper, classes.heroImgWrapperRight) : classes.heroImgWrapper}>
                <img src={'/images/' + home.imgSrc} alt={home.topline} className={classNames(classes.img, classes.heroImg)}/>
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
    padding: '10rem 0'
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
    marginBottom: '1rem',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '3rem',
    lineHeight: 1.1,
    fontWeight: 600,
  },
  heroSubtitle: {
    maxWidth: '27.5rem',
    marginBottom: '2.1875rem',
    fontSize: '1.125rem',
    lineHeight: '1.5rem',
  },
  heroImgWrapper: {
    maxWidth: '34.6875rem'
  },
  heroImgWrapperRight: {
    width: '100%',
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
  }
}))