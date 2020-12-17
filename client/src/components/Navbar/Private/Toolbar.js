import React, { useState, useEffect } from 'react'
import { useMail } from '../../../contexts/Mail/Private/MailState'
import { setLoading, getMails } from '../../../contexts/Mail/Private/MailAction'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Badge,
  Menu, MenuItem,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import NotificationsIcon from '@material-ui/icons/Notifications'

const Toolbar = ({
  classesGlobal,
  logo,
  goToPage, 
  setLogout,
  open, setOpen,
}) => {
  const [mailState, mailDispatch] = useMail()
  const { mails } = mailState

  const [unread, setUnread] = useState('10')

  /** theme - state */
  const classes = useStyles()

  const [myAccountEl, setMyAccountEl] = useState(null)
  const [mobileMenuNotyEl, setMobileMenuNotyEl] = useState(null)

  const isMyAccountMenuOpen = Boolean(myAccountEl);
  const isMobileMenuNotyOpen = Boolean(mobileMenuNotyEl)

  const renderMyAccount = (
    <Menu
      anchorEl={myAccountEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMyAccountMenuOpen}
      onClose={() => {
        setMyAccountEl(null)
        setMobileMenuNotyEl(null)
      }}
    >
      <MenuItem 
        onClick={() => {
          setMyAccountEl(null)
          setMobileMenuNotyEl(null)
          goToPage('/pfv4-admin/profile')
        }}
      >Profile</MenuItem>
      <MenuItem classes={{root: classes.menuItemLogout}}
        onClick={() => {
          setLogout(true)
          setMyAccountEl(null)
          setMobileMenuNotyEl(null)
        }}
      >Logout</MenuItem>
    </Menu>
  )

  const renderMobileNoty = (
    <Menu
      anchorEl={mobileMenuNotyEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuNotyOpen}
      onClose={() => setMobileMenuNotyEl(null)}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={unread} classes={{ badge: classes.colorBadge }}>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} classes={{ badge: classes.colorBadge }}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={(e) => setMyAccountEl(e.currentTarget)}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  /** mail get all - function */
  useEffect(() => {
    (async() => {
      await getMails(mailDispatch)

      setLoading(mailDispatch, false)
    })()
  }, [])

  /** mail unread get count - function */
  useEffect(() => {
    setUnread(() => {
      let unread = mails.filter(mail => mail.statusRead === 0)
      return unread.length.toString()
    })
  }, [mails])

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => setOpen(true)}
        edge="start"
        className={classNames(classes.menuButton, open && classesGlobal.hide)}
      >
        <MenuIcon />
      </IconButton>
      {logo('/pfv4-admin/dashboard')}
      <div className={classesGlobal.sectionDesktop}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={unread} classes={{ badge: classes.colorBadge }}>
            <MailIcon />
          </Badge>
        </IconButton>
        {/* <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} classes={{ badge: classes.colorBadge }}>
            <NotificationsIcon />
          </Badge>
        </IconButton> */}
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={(e) => setMyAccountEl(e.currentTarget)}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </div>
      <div className={classesGlobal.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-haspopup="true"
          onClick={(e) => setMobileMenuNotyEl(e.currentTarget)}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>
      {renderMobileNoty}
      {renderMyAccount}
    </>
  )
}

export default Toolbar

const useStyles = makeStyles((theme) => ({
  colorBadge: {
    backgroundColor: theme.palette.error.main,
    [theme.breakpoints.up('sm')]: {
      color: theme.palette.common.white,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuItemLogout: {
    '&:hover': {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white
    }
  },
}))