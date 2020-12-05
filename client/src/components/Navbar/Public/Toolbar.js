import React from 'react'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import {
  List, ListItem,
  IconButton,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const Toolbar = ({
  classesGlobal,
  logo,
  menuPublic, menuPublicListItem,
  buttonResume,
  open, setOpen,
  darkModeToggle
}) => {
  const classes = useStyles()
  
  return (
    <>
      {logo('/')}
      <div className={classesGlobal.sectionDesktop}>
        <List classes={{root: classes.menuPublic}}>
          {menuPublic.map(menu => menuPublicListItem('desktop', menu._id, menu.urlLink, menu.icon, menu.name))}
          <ListItem>
            {buttonResume}
          </ListItem>
          {darkModeToggle}
        </List>
      </div>
      <div className={classesGlobal.sectionMobile}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          edge="end"
          className={classNames(open && classesGlobal.hide)}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </>
  )
}

export default Toolbar

const useStyles = makeStyles((theme) => ({
  menuPublic: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
}))