import React from 'react'
import {
  List, ListItem, ListSubheader,
  Divider,
} from '@material-ui/core'

export const Drawer = ({
  classesGlobal,
  menuPublic, menuPublicListItem, 
  buttonResume,
  darkModeSwitch
}) => {
  return (
    <>
      <Divider classes={{ root: classesGlobal.divider }}/>
      <List
        subheader={
          <ListSubheader className={classesGlobal.listHeader}>
            Navigation
          </ListSubheader>
        }
      >
        {menuPublic.map(menu => menuPublicListItem('mobile', menu._id, menu.urlLink, menu.icon, menu.name))}
        <ListItem>
          {buttonResume}
        </ListItem>
        {darkModeSwitch}
      </List>
    </>
  )
}

export default Drawer