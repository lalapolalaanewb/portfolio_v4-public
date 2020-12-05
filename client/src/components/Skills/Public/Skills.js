import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@material-ui/core'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import DnsIcon from '@material-ui/icons/Dns'
import StorageIcon from '@material-ui/icons/Storage'
import CloudIcon from '@material-ui/icons/Cloud'

const Skills = ({ skills }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [changeIconColor, setChangeIconColor] = useState('')
  const [allTechs, setAllTechs] = useState([])

  /** handle icon display */
  const handleIconDisplay = (id, name) => {
    if(name.toLowerCase() === 'Front End'.toLowerCase()) return <DesktopWindowsIcon className={changeIconColor === id ? classNames(classes.icon, classes.iconMouseHover) : classes.icon} />
    if(name.toLowerCase() === 'Back End'.toLowerCase()) return <DnsIcon className={changeIconColor === id ? classNames(classes.icon, classes.iconMouseHover) : classes.icon} />
    if(name.toLowerCase() === 'Database'.toLowerCase()) return <StorageIcon className={changeIconColor === id ? classNames(classes.icon, classes.iconMouseHover) : classes.icon} />
    if(name.toLowerCase() === 'Deployment'.toLowerCase()) return <CloudIcon className={changeIconColor === id ? classNames(classes.icon, classes.iconMouseHover) : classes.icon} />
  }

  /** get all skill techs */
  useEffect(() => {
    (() => {
      if(skills.length > 0) { 
        // sort out filter list from projects
        let allTechs = []
        
        skills.forEach(skill => {
          skill.techs.forEach(tech => {
            // save the tech if categoriesProject array still empty
            if(allTechs.length === 0) allTechs.push({ _id: tech._id, name: tech.name })
            else {
              // check if category already exist in the array, if not , then save
              if(allTechs.map(cat => cat._id).indexOf(tech._id) === -1) allTechs.push({ _id: tech._id, name: tech.name })
            }
          })
        })
        
        setAllTechs(allTechs.sort((a, b) => a.name < b.name ? -1 : 1))
      }
    })()
  }, [skills])

  // const skills = [
  //   { _id: 0, name: 'Front End', 
  //     icon: <DesktopWindowsIcon className={changeIconColor === 0 ? classNames(classes.icon, classes.iconMouseHover) : classes.icon} />, 
  //     urlLink: '/contact', 
  //     techs: [
  //       { _id: 0, name: 'Html' },
  //       { _id: 1, name: 'Css|Scss' },
  //       { _id: 2, name: 'Vanilla JavaScript' },
  //       { _id: 3, name: 'Ionic' },
  //       { _id: 4, name: 'React' },
  //     ] 
  //   },
  //   { _id: 1, name: 'Back End', 
  //     icon: <DnsIcon className={changeIconColor === 1 ? classNames(classes.icon, classes.iconMouseHover) : classes.icon} />, 
  //     urlLink: '/contact', 
  //     techs: [
  //       { _id: 5, name: 'CodeIgniter' },
  //       { _id: 6, name: 'Yii2' },
  //       { _id: 7, name: 'Cake' },
  //       { _id: 8, name: 'NodeJs' } 
  //     ] 
  //   },
  //   { _id: 2, name: 'Database', 
  //     icon: <StorageIcon className={changeIconColor === 2 ? classNames(classes.icon, classes.iconMouseHover) : classes.icon} />, 
  //     urlLink: '/contact', 
  //     techs: [
  //       { _id: 9, name: 'MySql' },
  //       { _id: 10, name: 'Sql' },
  //       { _id: 11, name: 'MongoDB' } 
  //     ] 
  //   },
  //   { _id: 3, name: 'Deployment', 
  //     icon: <CloudIcon className={changeIconColor === 3 ? classNames(classes.icon, classes.iconMouseHover) : classes.icon} />, 
  //     urlLink: '/contact', 
  //     techs: [
  //       { _id: 13, name: 'Git' },
  //       { _id: 14, name: 'Amazon Aws EC2' },
  //       { _id: 15, name: 'Rest Api' },
  //       { _id: 16, name: 'GraphQL' } 
  //     ] 
  //   }
  // ]

  return allTechs.length > 0 && (
    <div className={classes.section}>
      <div className={classes.wrapper}>
        <Typography variant="h4" className={classes.heading}>Skills</Typography>
        <ul 
          style={{
            listStyle: 'none',
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          {allTechs.map(tech => (
            <li 
              key={tech._id}
              style={{
                padding: '5px 8px',
                margin: 5,
                fontWeight: 600,
                color: theme.palette.common.white,
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 5
              }}
            >
              {tech.name}
            </li>
          ))}
        </ul>
        {/* <div className={classes.container}>
          {skills.length > 0 ? skills.map(skill => (
            <Card 
              key={skill._id} 
              className={theme.palette.type === 'light' ? classes.card : classNames(classes.card, classes.cardLight)}
              onMouseOver={() => setChangeIconColor(skill._id)}
              onMouseOut={() => setChangeIconColor('')}
            >
              <CardContent className={classes.cardContent}>
                {handleIconDisplay(skill._id, skill.name)}
                <Typography variant="h5" component="h2" className={classes.name}>
                  {skill.name}
                </Typography>
                <List dense className={classes.skillList}>
                  {skill.techs.map(tech => (
                    <ListItem key={tech._id} className={classes.techList}>
                      <ListItemText primary={tech.name}></ListItemText>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )) : 'No available skills'}
        </div> */}
      </div>
    </div>
  )
}

export default Skills

const useStyles = makeStyles((theme) => ({
  section: {
    padding: '6.25rem 0 10rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto'
  },
  heading: {
    marginBottom: '1.5rem',
    fontWeight: 600
  },
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: 275,
    height: 375,
    margin: '1rem',
    backgroundColor: theme.palette.grey[50],
    '&:hover': {
      transform: 'scale(1.05)',
    },
    transition: theme.transitions.create(['all'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  cardLight: {
    backgroundColor: theme.palette.lighten.light
  },
  cardContent: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(2),
  },
  iconMouseHover: {
    color: theme.palette.secondary.main
  },
  skillList: {
    marginTop: theme.spacing(1.5),
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: 190,
    overflow: 'auto',
  },
  techList: {
    textAlign: 'center'
  }
}))