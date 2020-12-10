import React, { useEffect } from 'react'
import { useUser } from '../../contexts/User/Public/UserState'
import { setLoading, setError, getUserOnResume } from '../../contexts/User/Public/UserAction'
import ReactMarkDown from 'react-markdown'
import Markdown from '../../components/global/Markdown'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import { FaTimes } from 'react-icons/fa'

const Resume = () => {
  const [userState, userDispatch] = useUser()
  const { userResume, loading, error, message } = userState

  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** user get data - function */
  useEffect(() => {
    (async() => {
      await getUserOnResume(userDispatch)

      setLoading(userDispatch, false)
    })()
  }, [])

  /** handle goToUrl */
  const handleGoToUrl = url => {
    window.open(url)
  }

  return (
    <div className={theme.palette.type === 'light' ? classNames(classes.section, classes.sectionBgDark) : classes.section}>
      {loading && <div className="lds-hourglass accents-ver"></div>}
      {error && (
        <div className="error__container">
          <FaTimes size={20} className="error__btn" 
            onClick={() => setError(userDispatch, {status: false, message: ''})} 
          />
          <p className="error__message message__break">{message}</p>
        </div>
      )}
      <div className={theme.palette.type === 'light' ? classNames(classes.container, classes.containerBgDark) : classNames(classes.container, classes.containerBgLight)}>
        <Button 
          variant="contained" 
          color="secondary" 
          style={{
            color: theme.palette.common.white,
            alignSelf: 'flex-end',
            margin: 10
          }}
          onClick={() => handleGoToUrl('/files/' + userResume.resume.pdfSrc)}
        >
          Download
        </Button>
        <div className={theme.palette.type === 'light' ? classNames(classes.person, classes.personBgDark) : classNames(classes.person, classes.personBgLight)}>
          <Typography variant="h2" style={{fontWeight: 500}}>{userResume.name.firstName} {userResume.name.lastName}</Typography>
          <Typography variant="subtitle1">{userResume.resume.contactInfo.title}</Typography>
        </div>
        <div className={classes.content}>
          <div className={classes.contentLeft}>
            <div className="child">
              <Typography variant="body1" className={classes.itemTitle}>Info</Typography>
              <Typography variant="body1" color="textSecondary" className={classes.emails}>Email: {userResume.email}</Typography>
              <Typography variant="body1" color="textSecondary" className={classes.emails}>Website: <span style={{cursor: 'pointer', color: theme.palette.secondary.main}} onClick={() => handleGoToUrl(userResume.resume.contactInfo.website)}>{userResume.resume.contactInfo.website}</span></Typography>
            </div>
            {userResume.resume.techs.length > 0 && (
              <div className="child">
                <Typography variant="body1" className={classes.itemTitle}>Skills</Typography>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {userResume.resume.techs.map(tech => (
                  <li key={tech._id}>
                    <Typography variant="body1" color="textSecondary">{tech.name}</Typography>
                  </li>
                ))}
                </ul>
              </div>
            )}
            {userResume.resume.educations.length > 0 && (
              <div className="child">
                <Typography variant="body1" className={classes.itemTitle}>Educations</Typography>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {userResume.resume.educations.map(edu => (
                  <li key={edu._id}>
                    <Typography variant="body1" color="textSecondary">{edu.title}</Typography>
                    <Typography variant="body1" color="textSecondary" style={{fontStyle: 'italic'}}>{edu.entity}</Typography>
                  </li>
                ))}
                </ul>
              </div>
            )}
          </div>
          <div className={classes.contentRight}>
            {userResume.resume.description !== '' && (
              <div className="child">
                <Typography variant="body1" className={classes.itemTitle}>About</Typography>
                <Typography variant="body1" color="textSecondary">{userResume.resume.description}</Typography>
              </div>
            )}
            {userResume.resume.jobs.length > 0 && (
              <div className="child">
                <Typography variant="body1" className={classes.itemTitle}>Jobs</Typography>
                <div className={classes.scrollingItems}>
                  {userResume.resume.jobs.map((job, index) => (
                    <div key={job._id}>
                      <Typography variant="body1" color="textSecondary">{+index + 1}) {job.name} - <span style={{fontStyle: 'italic'}}>{job.company}</span></Typography>
                      <div className={classes.markdown}>{job.description !== '' && <ReactMarkDown source={job.description} renderers={{ code: Markdown }}/>}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {userResume.resume.projects.length > 0 && (
              <div className="child">
                <Typography variant="body1" className={classes.itemTitle}>Projects</Typography>
                <div className={classes.scrollingItems}>
                  {userResume.resume.projects.map((project, index) => (
                    <div key={project._id}>
                      <Typography variant="body1" color="textSecondary">{+index + 1}) {project.name}</Typography>
                      <div className={classes.markdown}>{project.subDescription !== '' && <ReactMarkDown source={project.subDescription} renderers={{ code: Markdown }}/>}</div>
                      <div style={{width: '100%', display: 'flex', flexFlow: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        {project.liveUrls.www !== '' && (
                          <Typography 
                            variant="button" 
                            color="textSecondary" 
                            style={{marginRight: 10, color: theme.palette.secondary.main, cursor: 'pointer'}}
                            onClick={() => handleGoToUrl(project.liveUrls.www)}
                          >
                            demo
                          </Typography>
                        )}
                        {project.liveUrls.code !== '' && (
                          <Typography 
                            variant="button" 
                            color="textSecondary" 
                            style={{color: theme.palette.warning.main, cursor: 'pointer'}}
                            onClick={() => handleGoToUrl(project.liveUrls.code)}
                          >
                            github
                          </Typography>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume

const useStyles = makeStyles(theme => ({
  section: {
    // border: '2px solid red',
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionBgDark: {
    backgroundColor: theme.palette.grey[200]
  },
  container: {
    maxWidth: 900,
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    '@media (max-width: 900px)': {
      margin: 10,
    }
  },
  containerBgLight: {
    boxShadow: `0px 0px 15px 2px ${theme.palette.lighten.light}`,
    background: `linear-gradient(to right, ${theme.palette.lighten.light}, ${theme.palette.darken.light} 6%)`,
  },
  containerBgDark: {
    boxShadow: `0px 0px 15px 2px ${theme.palette.grey[800]}`,
    background: `linear-gradient(to right, ${theme.palette.grey[300]}, ${theme.palette.common.white} 6%)`,
  },
  person: {
    margin: '50px 0',
    padding: 20,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 400px)': {
      '& h2': {
        fontSize: 40
      },
    },
    '@media (max-width: 330px)': {
      '& h2': {
        fontSize: 30
      },
    }
  },
  personBgLight: {
    border: `3px solid ${theme.palette.common.white}`,
    backgroundColor: theme.palette.lighten.light
  },
  personBgDark: {
    border: `3px solid ${theme.palette.common.black}`,
    backgroundColor: theme.palette.common.white
  },
  content:{
    // border: '1px solid blue',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0 50px',
    '@media (max-width: 900px)': {
      flexFlow: 'column',
      padding: '0 25px'
    },
    '@media (max-width: 400px)': {
      padding: '0 5px'
    }
  },
  contentLeft: {
    // border: '1px solid green',
    maxWidth: 300,
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '20px 30px 20px 30px',
    '& .child': {
      width: '100%'
    },
    '& .child:not(:last-child)': {
      marginBottom: 35
    },
    '@media (max-width: 900px)': {
      maxWidth: '100%'
    },
    '@media (max-width: 400px)': {
      padding: '20px 20px 20px 20px',
    },
    '@media (max-width: 300px)': {
      padding: '20px 0px 20px 0px',
    }
  },
  contentRight: {
    // border: '1px solid yellow',
    maxWidth: 500,
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '20px 30px 20px 30px',
    '& .child': {
      width: '100%'
    },
    '& .child:not(:last-child)': {
      marginBottom: 35
    },
    '@media (max-width: 900px)': {
      maxWidth: '100%'
    },
    '@media (max-width: 400px)': {
      padding: '20px 20px 20px 20px',
    },
    '@media (max-width: 300px)': {
      padding: '20px 0px 20px 0px',
    }
  },
  itemTitle: {
    fontWeight: 600, 
    fontSize: 18, 
    textDecoration: 'underline', 
    textTransform: 'uppercase',
    marginBottom: 10
  },
  scrollingItems: {
    '@media (min-width: 900px)': {
      maxHeight: 360, 
      overflow: 'auto',
    }
  },
  emails: {
    width: '100%',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
  },
  markdown: {
    // border: '1px solid yellow',
    width: '100%',
    maxWidth: '100%',
    overflow: 'auto'
  },
}))