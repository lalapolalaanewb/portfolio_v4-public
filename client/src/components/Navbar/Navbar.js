import React, { useState } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { UserState } from '../../contexts/User/Public/UserState'
import { SubscriptionState as SubscriptionStatePublic } from '../../contexts/Subscription/Public/SubscriptionState'
import { setCookie } from '../../services/Cookie'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Drawer,
  ListItem, ListItemIcon, ListItemText,
  Typography,
  IconButton,
  CssBaseline,
  Paper,
  Button,
  Switch
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MailIcon from '@material-ui/icons/Mail'
import CodeIcon from '@material-ui/icons/Code'
import PersonIcon from '@material-ui/icons/Person'
import HomeIcon from '@material-ui/icons/Home'
import AssignmentIcon from '@material-ui/icons/Assignment'
import DescriptionIcon from '@material-ui/icons/Description'
import GetAppIcon from '@material-ui/icons/GetApp'
import BrightnessHighOutlinedIcon from '@material-ui/icons/BrightnessHighOutlined'
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined'
import ToolbarPublic from './Public/Toolbar'
import DrawerPublic from './Public/Drawer'
import FooterPublic from '../Footer/Public/Footer'

const Navbar = ({ isDarkMode, setIsDarkMode, children }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const history = useHistory()

  // logo
  const logo = (url) => {
    return (
      <div className={classes.logo} onClick={() => goToPage(url)}>
        <CodeIcon />
        <Typography className="logo-title" variant="h6" noWrap>
          L<span>pN</span>b
        </Typography>
      </div>
    )
  }

  // public menu
  const menuPublic = [
    {_id: 0, name: 'Home', icon: <HomeIcon />, urlLink: '/'},
    {_id: 1, name: 'About', icon: <PersonIcon />, urlLink: '/about'},
    {_id: 2, name: 'Projects', icon: <AssignmentIcon />, urlLink: '/projects'},
    {_id: 3, name: 'Blog', icon: <DescriptionIcon />, urlLink: '/blog'},
    {_id: 4, name: 'Contact', icon: <MailIcon />, urlLink: '/contact'}
  ]

  // public muneList
  const menuPublicListItem = (platform, id, url, icon, name) => {
    return (
      <ListItem 
        key={id}
        button
        classes={{root: classes.listItem}}
        component={NavLink}
        activeClassName={classes.listItemActive}
        to={url}
        exact
      >
        {platform === 'mobile' && <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>}
        <ListItemText primary={name} />
      </ListItem>
    )
  }

  // dark mode toggle (for toolbar)
  const darkModeToggle = (
    <ListItem>
      <IconButton color="inherit" size="small" 
        onClick={() => {
          setIsDarkMode(!isDarkMode)
          let mode = !isDarkMode === true ? 'dark' : 'light'
          setCookie('themeMode', mode, { path: '/' })
        }}
      >
        {isDarkMode ? <BrightnessHighOutlinedIcon /> : <Brightness2OutlinedIcon />}
      </IconButton>
    </ListItem>
  )

  // dark mode switch (for drawer)
  const darkModeSwitch = (
    <ListItem button classes={{switchBase: classes.listItem}}>
      <ListItemIcon className={classes.listIcon}>
        {isDarkMode ? <Brightness2OutlinedIcon /> : <BrightnessHighOutlinedIcon />}
      </ListItemIcon>
      <Switch checked={isDarkMode} 
        classes={{
          root: classes.switchRoot,
          switchBase: classes.switchBase,
          track: classes.switchTrack,
          checked: classes.switchChecked
        }}
        onChange={() => {
          setIsDarkMode(!isDarkMode)
          let mode = !isDarkMode === true ? 'dark' : 'light'
          setCookie('themeMode', mode, { path: '/' })
        }}
      />
      <ListItemText primary="Dark Mode" />
    </ListItem>
  )

  // resume btn
  const buttonResume = (
    <Button
      variant="contained"
      color="secondary"
      classes={{root: classes.ctaResume}}
      startIcon={<GetAppIcon />}
      onClick={() => goToPage('/resume')}
    >
      Resume
    </Button>
  )

  // handle redirect to pages
  const goToPage = (pathUrl) => {
    history.push(pathUrl)
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {[classes.appBarShift]: open})}
      >
        <Toolbar className={classes.toolBarSpacing}>
          <ToolbarPublic classesGlobal={classes} logo={logo} menuPublic={menuPublic} menuPublicListItem={menuPublicListItem} buttonResume={buttonResume} open={open} setOpen={setOpen} darkModeToggle={darkModeToggle} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton className={classes.listIcon} classes={{root: classes.closeMenuIcon}} onClick={() => setOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <DrawerPublic classesGlobal={classes} menuPublic={menuPublic} menuPublicListItem={menuPublicListItem} buttonResume={buttonResume} darkModeSwitch={darkModeSwitch} />
      </Drawer>
      <Paper
        className={classNames(classes.content, { [classes.contentShift]: open })}>
        <div className={classes.drawerHeader} />
        {/* <Typography variant="h4" classes={{root: classes.contentHeader}}>
          Where is this?
        </Typography> */}
        {children}
        <UserState>
          <SubscriptionStatePublic>
            <FooterPublic />
          </SubscriptionStatePublic>
        </UserState>
      </Paper>
    </div>
  )
}

export default Navbar

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: theme.palette.darken.main,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  toolBarSpacing: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '& .logo-title': {
      marginLeft: '5px',
      '& span': {
        color: theme.palette.secondary.main
      }
    }
  },
  hide: {
    display: 'none',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  divider: {
    backgroundColor: theme.palette.lighten.main
  },
  listHeader: {
    color: theme.palette.lighten.main,
    fontWeight: '600'
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.lighten.light
    },
  },
  listItemActive: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.lighten.light
  },
  listSubItem: {
    '&:hover': {
      backgroundColor: theme.palette.darken.light
    }
  },
  subListItemActive: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.darken.light
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main
  },
  closeMenuIcon: {
    '&:hover': {
      backgroundColor: theme.palette.lighten.light
    }
  },
  listIcon: {
    color: theme.palette.common.white
  },
  subList: {
    backgroundColor: theme.palette.darken.main
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  ctaResume: {
    color: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  switchRoot: {},
  switchBase: {
    color: theme.palette.secondary.main,
    '&$switchChecked': {
      color: theme.palette.secondary.main
    },
    '&$switchChecked + $switchTrack': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  switchTrack: {},
  switchChecked: {},
  content: {
    width: '100%',
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  contentHeader: {
    backgroundColor: theme.palette.primary.main
  },
}))