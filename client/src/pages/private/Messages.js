import React, { useState } from 'react'
import { MailState } from '../../contexts/Mail/Private/MailState'
import Setting from '../../components/Messages/Setting'
import Mails from '../../components/Messages/Mails'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { 
  AppBar,
  Box, 
  Tab, Tabs, 
  Typography 
} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import MailIcon from '@material-ui/icons/Mail'

const Messages = () => {
  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** tab - states */
  const [value, setValue] = useState(0);

  return (
    <>
      <div className={classes.tabContainer}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="secondary"
            // TabIndicatorProps={{ style: { backgroundColor: theme.palette.warning.main } }}
            textColor="secondary"
            aria-label="scrollable force tabs example"
            // centered
            style={{
              backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.darken.light
            }}
          >
            <Tab label="Setting" icon={<SettingsIcon />} {...a11yProps(0)} />
            <Tab label="Mails" icon={<MailIcon />} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Setting />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MailState><Mails /></MailState>
        </TabPanel>
      </div>
    </>
  )
}

export default Messages

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  tabContainer: {
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
}))