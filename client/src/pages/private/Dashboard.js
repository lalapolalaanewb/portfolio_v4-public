import React, { useState, useEffect } from 'react'
import { useDashboard } from '../../contexts/Dashboard/DashboardState'
import { setLoading, setError, setSuccess, getDashboard, resetAllRedisData } from '../../contexts/Dashboard/DashboardAction'
import AlertMessage from '../../components/global/Alert'
import Headline from '../../components/global/Headline'
import { DividerBlank } from '../../components/global/Divider'
import Total from '../../components/Dashboard/Total'
import Personal from '../../components/Dashboard/Personal'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import ResetIcon from '@material-ui/icons/RotateLeft'
import { AiFillProject, AiOutlineShareAlt } from 'react-icons/ai'
import { CgUserList } from 'react-icons/cg'
import { BiFile, BiListUl } from 'react-icons/bi'
import { BsFilePost } from 'react-icons/bs'
import { GoMailRead } from 'react-icons/go'
import { HiBriefcase, HiHome, HiUser } from 'react-icons/hi'
import { MdPhotoAlbum, MdSchool, MdSubscriptions } from 'react-icons/md'
import { getCookie } from '../../services/Cookie'

const Dashboard = () => {
  const [dashboardState, dashboardDispatch] = useDashboard()
  const { dashboard, loading, error, success, message } = dashboardState

  /** theme - states */
  const classes = useStyles()

  /** dashboard reset redis all data - state */
  const [isResetRedis, setIsResetRedis] = useState(false)
  
  /** dashboard get - function */
  useEffect(() => {
    (async() => {
      // await getDashboard(dashboardDispatch)

      setLoading(dashboardDispatch, false)
      
      await fetch('/api/v1/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': (() => {
            let uid = getCookie('uid')
            return `Bearer ${uid}`
          })()
        }
      })
      .then(res => res.json())
      .then(data => {
        // const result = await res.json()
        console.log(data)
        if(data === undefined) dashboardDispatch({
          type: 'SET_DASHBOARD',
          payload: {
            total: {
              aboutsCount: 1,
              edusCount: 1,
              homesCount: 1,
              jobsCount: 1,
              mailsCount: 1,
              mediasCount: 1,
              postsCount: 1,
              projectsCount: 1,
              skillsCount: 1,
              socialMediasCount: 1,
              subscriptionsCount: 1,
              techsCount: 1,
              usersCount: 1
            },
            user: {
              _id: 'cache',
              abouts: 1,
              edus: 1,
              homes: 1,
              jobs: 1,
              mails: 1,
              medias: 1,
              posts: 1,
              projects: 1,
              skills: 1,
              socialMedias: 1,
              subscriptions: 1,
              techs: 1
            }
          }
        })
        else dashboardDispatch({
          type: 'SET_DASHBOARD',
          payload: {
            total: data.data.total,
            user: data.data.user
          }
        })
      })
      .catch(err => console.log(err.response))
      console.log(dashboard)
      setLoading(dashboardDispatch, false)
    })()
  }, [])

  /** dashboard reset redis all data - function */
  const resetRedisAllData = async() => {
    await resetAllRedisData(dashboardDispatch)

    setLoading(dashboardDispatch, false)
  }

  useEffect(() => {
    (async() => {
      if(isResetRedis) {
        await resetAllRedisData(dashboardDispatch)

        setLoading(dashboardDispatch, false)
      }
    })()
  }, [isResetRedis])

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
      {/* <Total globalClasses={classes} /> */}
      <div>
        <div className={classes.cards}>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <BiFile size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>About</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.aboutsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <MdSchool size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Education</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.edusCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <HiHome size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Home</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.homesCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <HiBriefcase size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Job</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.jobsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <GoMailRead size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Mails</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.mailsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <MdPhotoAlbum size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Medias</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.mediasCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <MdSubscriptions size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Newsletter Sub</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.subscriptionsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <BsFilePost size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Posts</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.postsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <AiFillProject size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Projects</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.projectsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <CgUserList size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Skill</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.skillsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <AiOutlineShareAlt size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Social Media</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.socialMediasCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <BiListUl size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Tech</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.techsCount}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <HiUser size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>User</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.usersCount}</Typography>
            </div>
          </div>
        </div>
      </div>
      <DividerBlank />
      <Headline headline="Personal" subHeadline="Representation" />
      {/* <Personal globalClasses={classes} /> */}
      <div>
        <div className={classes.cards}>
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
              <MdSchool size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Education</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.edus}</Typography>
            </div>
          </div>
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
              <HiBriefcase size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Job</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.jobs}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <GoMailRead size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Mails</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.mails}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <MdPhotoAlbum size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Medias</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.medias}</Typography>
            </div>
          </div>
          <div className={classes.card}>
            <div className={classes.iconContainer}>
              <MdSubscriptions size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Newsletter Subs</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.subscriptions}</Typography>
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
              <CgUserList size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Skill</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.skills}</Typography>
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
              <BiListUl size={'100%'} />
            </div>
            <div>
              <Typography variant="h5" className={classes.title}>Tech</Typography>
              <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.techs}</Typography>
            </div>
          </div>
        </div>
      </div>
      <DividerBlank />
      <Headline headline="Reset" subHeadline="Redis Data" />
      <div className={classes.buttonReset}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.resetButton}
          startIcon={<ResetIcon />}
          onClick={() => resetRedisAllData()}
          // onClick={e => {
          //   e.preventDefault()
          //   setIsResetRedis(true)
          // }}
        >
          Reset Redis
        </Button>
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
  buttonReset: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  resetButton: {
    color: theme.palette.common.white
  },
}))