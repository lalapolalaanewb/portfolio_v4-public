import React, { useState, useEffect } from 'react'
import { useDashboard } from '../../contexts/Dashboard/DashboardState'
import { setLoading, setError, setSuccess, getDashboard } from '../../contexts/Dashboard/DashboardAction'
import AlertMessage from '../../components/global/Alert'
import Headline from '../../components/global/Headline'
import { DividerBlank } from '../../components/global/Divider'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { AiFillProject, AiOutlineShareAlt } from 'react-icons/ai'
import { CgUserList } from 'react-icons/cg'
import { BiFile, BiListUl } from 'react-icons/bi'
import { BsFilePost } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { HiBriefcase, HiHome, HiUser } from 'react-icons/hi'

const Dashboard = () => {
  const [dashboardState, dashboardDispatch] = useDashboard()
  const { dashboard, loading, error, success, message } = dashboardState

  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** dashboard get - function */
  useEffect(() => {
    (async() => {
      await getDashboard(dashboardDispatch)

      setLoading(dashboardDispatch, false) 
    })()
  }, [])

  return (
    <>
      {loading && <div className="lds-hourglass accents-ver"></div>}
      {error && (
        <AlertMessage
          severity="warning" title="Warning"
          dispatch={dashboardDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={dashboardDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <Headline headline="Total" subHeadline="Representation" />
      <div>
        <div className={classes.cards}>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <HiHome size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Home</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.homesCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <BiFile size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>About</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.aboutsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <AiOutlineShareAlt size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Social Media</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.socialMediasCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <HiBriefcase size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Job</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.jobsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <CgUserList size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Skill</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.skillsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <BiListUl size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Tech</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.techsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <AiFillProject size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Projects</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.projectsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <BsFilePost size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Posts</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.postsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <HiUser size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>User</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.usersCount}</Typography>
            </div>
          </div>
        </div>
      </div>
      <DividerBlank />
      <Headline headline="Personal" subHeadline="Representation" />
      <div>
        <div className={classes.cards}>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <HiHome size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Home</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.homes}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <BiFile size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>About</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.abouts}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <AiOutlineShareAlt size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Social Media</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.socialMedias}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <HiBriefcase size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Job</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.jobs}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <CgUserList size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Skill</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.skills}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <BiListUl size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Tech</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.techs}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <AiFillProject size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Projects</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.projects}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <BsFilePost size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Posts</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.posts}</Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

const useStyles = makeStyles(theme => ({
  cards: {
    // border:'1px solid blue',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  card: {
    // border: '1px solid yellow',
    minWidth: 250,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconContainer: {
    // border: '1px solid green', 
    maxWidth: 84, 
    height: 84,
  },
  title: {
    width: '100%', 
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  },
}))