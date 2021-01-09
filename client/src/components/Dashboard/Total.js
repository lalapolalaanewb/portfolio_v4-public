import React from 'react'
import { useDashboard } from '../../contexts/Dashboard/DashboardState'
import { Typography } from '@material-ui/core'
import { AiFillProject, AiOutlineShareAlt } from 'react-icons/ai'
import { CgUserList } from 'react-icons/cg'
import { BiFile, BiListUl } from 'react-icons/bi'
import { BsFilePost } from 'react-icons/bs'
import { GoMailRead } from 'react-icons/go'
import { HiBriefcase, HiHome, HiUser } from 'react-icons/hi'
import { MdPhotoAlbum, MdSchool, MdSubscriptions } from 'react-icons/md'

const Total = ({ globalClasses }) => {
  const [dashboardState, dashboardDispatch] = useDashboard()
  const { dashboard } = dashboardState

  return (
    <div>
      <div className={globalClasses.cards}>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <BiFile size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>About</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.aboutsCount}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <MdSchool size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Education</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.edusCount}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <HiHome size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Home</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.homesCount}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <HiBriefcase size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Job</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.jobsCount}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <GoMailRead size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Mails</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.mailsCount}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <MdPhotoAlbum size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Medias</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.mediasCount}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <MdSubscriptions size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Newsletter Sub</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.subscriptionsCount}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <BsFilePost size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Posts</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.postsCount}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <AiFillProject size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Projects</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.projectsCount}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <CgUserList size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Skill</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.skillsCount}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <AiOutlineShareAlt size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Social Media</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.socialMediasCount}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <BiListUl size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Tech</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.techsCount}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <HiUser size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>User</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.total.usersCount}</Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Total