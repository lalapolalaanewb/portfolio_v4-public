import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  List, ListItem, ListItemIcon, ListItemText, ListSubheader,
  Divider,
  Collapse,
  Avatar,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import HomeIcon from '@material-ui/icons/Home'
import AssignmentIcon from '@material-ui/icons/Assignment'
import DescriptionIcon from '@material-ui/icons/Description'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

const Drawer = ({
  classesGlobal,
  darkModeSwitch
}) => {
  const classes = useStyles()
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false)

  const systemDataMenuList = [
    {_id: 0, name: 'Dashboard', icon: <HomeIcon />, urlLink: '/pfv4-admin/dashboard'},
    {_id: 1, name: 'Projects', icon: <AssignmentIcon />, urlLink: '/pfv4-admin/projects'},
    {_id: 2, name: 'Posts', icon: <DescriptionIcon />, urlLink: '/pfv4-admin/posts'},
    {_id: 3, name: 'Create', icon: <NoteAddIcon />, urlLink: ''},
  ]

  const systemDataListItems = (id, url, icon, name) => {
    if(name === 'Create') {
      return (
        <ListItem
          key={id} 
          button 
          classes={{root: classesGlobal.listItem}} 
          onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
        >
          <ListItemIcon className={classesGlobal.listIcon}>{icon}</ListItemIcon>
          <ListItemText primary={name} />
          {isCreateMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      )
    } else {
      return (
        <ListItem 
          key={id}
          button 
          classes={{root: classesGlobal.listItem}} 
          component={NavLink}
          activeClassName={classesGlobal.listItemActive}
          to={url}
          exact
        >
          <ListItemIcon className={classesGlobal.listIcon}>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      )
    }
  }

  const createDataMenuList = [
    {_id: 0, name: 'Media Social', icon: <EditOutlinedIcon />, urlLink: '/pfv4-admin/create/mediasocials'},
    {_id: 1, name: 'Policy', icon: <EditOutlinedIcon />, urlLink: '/pfv4-admin/create/policies'},
    {_id: 2, name: 'Skill', icon: <EditOutlinedIcon />, urlLink: '/pfv4-admin/create/skills'},
    {_id: 3, name: 'Tech', icon: <EditOutlinedIcon />, urlLink: '/pfv4-admin/create/techs'},
    {_id: 4, name: 'User', icon: <EditOutlinedIcon />, urlLink: '/pfv4-admin/create/users'},
  ]

  const createDataListItems = (id, url, icon, name) => {
    return (
      <ListItem 
        key={id}
        button 
        classes={{root: classesGlobal.listSubItem}} 
        className={classesGlobal.nested} 
        component={NavLink}
        activeClassName={classesGlobal.subListItemActive}
        to={url}
        exact
      >
        <ListItemIcon className={classesGlobal.listIcon}>
          <Avatar classes={{root: classesGlobal.avatar}}>
            {icon}
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    )
  }

  return (
    <>
      <Divider classes={{ root: classesGlobal.divider }}/>
      <List
        subheader={
          <ListSubheader className={classesGlobal.listHeader}>
            Personal Data
          </ListSubheader>
        }
      >
        <ListItem 
          button 
          classes={{root: classesGlobal.listItem}} 
          component={NavLink}
          activeClassName={classesGlobal.listItemActive}
          to="/pfv4-admin/profile"
          exact
        >
          <ListItemIcon className={classesGlobal.listIcon}><PersonIcon /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Divider classes={{ root: classesGlobal.divider }}/>
      <List
        subheader={
          <ListSubheader className={classesGlobal.listHeader}>
            System Data
          </ListSubheader>
        }
      >
        {systemDataMenuList.map(menu => systemDataListItems(menu._id, menu.urlLink, menu.icon, menu.name))}
        <Collapse in={isCreateMenuOpen} timeout="auto" unmountOnExit>
          <List className={classesGlobal.subList} component="div" disablePadding>
            {createDataMenuList.map(menu => createDataListItems(menu._id, menu.urlLink, menu.icon, menu.name))}
          </List>
        </Collapse>
      </List>
      <Divider classes={{ root: classesGlobal.divider }}/>
      <List
        subheader={
          <ListSubheader className={classesGlobal.listHeader}>
            Setting
          </ListSubheader>
        }
      >
        {darkModeSwitch}
        {/* <ListItem button classes={{switchBase: classesGlobal.listItem}}>
          <ListItemIcon className={classesGlobal.listIcon}>
            {isDarkMode ? <Brightness2OutlinedIcon /> : <BrightnessHighOutlinedIcon />}
          </ListItemIcon>
          <Switch checked={isDarkMode} 
            classes={{
              root: classesGlobal.switchRoot,
              switchBase: classesGlobal.switchBase,
              track: classesGlobal.switchTrack,
              checked: classesGlobal.switchChecked
            }}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <ListItemText primary="Dark Mode" />
        </ListItem> */}
      </List>
    </>
  )
}

export default Drawer

const useStyles = makeStyles((theme) => ({
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
}))