import React, { useState } from 'react'
import { PersonalState } from '../../contexts/User/Private/Personal/PersonalState'
import { HomeState } from '../../contexts/User/Private/Home/HomeState'
import { AboutState } from '../../contexts/User/Private/About/AboutState'
import { SocialState } from '../../contexts/User/Private/Social/SocialState'
import { JobState } from '../../contexts/User/Private/Job/JobState'
import Personal from '../../components/Profile/Personal'
import Home from '../../components/Profile/Home'
import About from '../../components/Profile/About'
import Social from '../../components/Profile/Social'
import Job from '../../components/Profile/Job'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { 
  AppBar,
  Box, 
  Tab, Tabs, 
  Typography 
} from '@material-ui/core'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import HomeIcon from '@material-ui/icons/Home'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import TheatersIcon from '@material-ui/icons/Theaters'
import WorkIcon from '@material-ui/icons/Work'

const Profile = () => {
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
            <Tab label="Personal" icon={<PersonPinIcon />} {...a11yProps(0)} />
            <Tab label="Home" icon={<HomeIcon />} {...a11yProps(1)} />
            <Tab label="About" icon={<PersonPinCircleIcon />} {...a11yProps(2)} />
            <Tab label="Social" icon={<TheatersIcon />} {...a11yProps(3)} />
            <Tab label="Job" icon={<WorkIcon />} {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <PersonalState><Personal /></PersonalState>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <HomeState><Home /></HomeState>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AboutState><About /></AboutState>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SocialState><Social /></SocialState>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <JobState><Job /></JobState>
        </TabPanel>
      </div>
    </>
  )
}

export default Profile

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