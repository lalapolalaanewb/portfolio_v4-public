import React from 'react'
import { useDashboard } from '../../contexts/Dashboard/DashboardState'
import { Typography } from '@material-ui/core'
import { AiFillProject, AiOutlineShareAlt } from 'react-icons/ai'
import { CgUserList } from 'react-icons/cg'
import { BiFile, BiListUl } from 'react-icons/bi'
import { BsFilePost } from 'react-icons/bs'
import { GoMailRead } from 'react-icons/go'
import { HiBriefcase, HiHome } from 'react-icons/hi'
import { MdPhotoAlbum, MdSchool, MdSubscriptions } from 'react-icons/md'

const Personal = ({ globalClasses }) => {
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
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.abouts}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <MdSchool size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Education</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.edus}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <HiHome size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Home</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.homes}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <HiBriefcase size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Job</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.jobs}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <GoMailRead size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Mails</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.mails}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <MdPhotoAlbum size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Medias</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.medias}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <MdSubscriptions size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Newsletter Subs</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.subscriptions}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <BsFilePost size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Posts</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.posts}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <AiFillProject size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Projects</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.projects}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <CgUserList size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Skill</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.skills}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <AiOutlineShareAlt size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Social Media</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.socialMedias}</Typography>
          </div>
        </div>
        <div className={globalClasses.card}>
          <div className={globalClasses.iconContainer}>
            <BiListUl size={'100%'} />
          </div>
          <div>
            <Typography variant="h5" className={globalClasses.title}>Tech</Typography>
            <Typography variant="body1" color="secondary" style={{ fontWeight: 500 }}>{dashboard.user.techs}</Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Personal