import React, { useEffect, useState } from 'react'
import { useProjects } from '../../../contexts/Projects/Public/ProjectsState'
import { updateProjectLikeCount } from '../../../contexts/Projects/Public/ProjectsAction'
import Paginate from '../../global/Paginate'
import { numberFormatting } from '../../../Utils/formatting/numberFormatting'
import ReactMarkDown from 'react-markdown'
import Markdown from '../../global/Markdown'
import { MarkDownStyles } from '../../global/Markdown'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { 
  Avatar, 
  Card, 
  CardActions, 
  CardContent, 
  CardHeader, 
  CardMedia, 
  Collapse, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  Tooltip, 
  Typography, 
  Zoom 
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CodeIcon from '@material-ui/icons/Code'
import PublicIcon from '@material-ui/icons/Public'

export const ProjectList = ({
  searchKey, 
  checkByOld, 
  checkByLatest, 
  optionCreatedAt, 
  techFilterList,
  setLoading,
  isRegister,
  guestId,
  createNewUser
}) => {
  const [projectsState, projectsDispatch] = useProjects()
  const { projects } = projectsState

  const classes = useStyles()
  const theme = useTheme()
  const { markdownStyles } = MarkDownStyles()

  // page specific states & functions
  const [filteredProjects, setFilteredProjects] = useState([])
  const [projectDescExpended, setProjectDescExpended] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [projectsPerPage, setProjectsPerPage] = useState(9)
  const [projectsPerGroup, setProjectsPerGroup] = useState(9)
  const [pageNumber, setPageNumber] = useState(1)
  const [projectId, setProjectId] = useState('')
  const [isLikeProject, setIsLikeProject] = useState(false)
  const [isLikeProjectOpt, setIsLikeProjectOpt] = useState('')
  const [likeProjectCount, setLikeProjectCount] = useState(0)
  const [likeProjects, setLikeProjects] = useState([])
  const [copyLinkSuccess, setCopyLinkSuccess] = useState('')
  const [link2Copy, setLink2Copy] = useState(null)

  // handle going to external link
  const goToPage = (url) => {
    return window.location.assign(url)
  }

  // handle getting page num
  const getPageNum = (projects) => {
    let pageNum = (() =>{
      let num = projects.length / projectsPerPage
      if(Math.round(num) < 1) return num = 1
      return Math.ceil(num)
    })()

    return pageNum
  }

  // handle searching of posts
  const search = (projects, value) => {
    return projects.filter(
      project => project.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  // handle sorting of posts
  const sorting = (projects, status, order) => {
    let latest2Old = [], projectsInitial = []

    if(!status) projectsInitial = projects
    else projectsInitial = projects.filter(project => project.techs.some(tech => techFilterList.includes(tech._id)))

    if(order === 'oldest') latest2Old = projectsInitial.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
    else latest2Old = projectsInitial.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

    return latest2Old
  }

  const handleFiltering = (projects, searchKey, checkByOld, checkByLatest, optionCreatedAt, techFilterList) => {
    let projectsFilter = search(projects, searchKey)

    if(checkByOld || checkByLatest) {
      if(optionCreatedAt === 'oldest') {
        if(techFilterList <= 0) return setFilteredProjects(() => sorting(projectsFilter, false, 'oldest'))
        setFilteredProjects(() => sorting(projectsFilter, true, 'oldest'))
      } else {
        if(techFilterList <= 0) return setFilteredProjects(() => sorting(projectsFilter, false, 'latest'))
        setFilteredProjects(() => sorting(projectsFilter, true, 'latest'))
      }
    } else setFilteredProjects(() => sorting(projectsFilter, false, 'latest'))
  }

  // set current data
  useEffect(() => {
    (() => {
      if(projects) {
        setPageNumber(() => getPageNum(projects))
        setFilteredProjects(() => {
          let projectsFilter = search(projects, '')
          return sorting(projectsFilter, false, 'latest')
        })
      }
    })()
  }, [projects, projectsPerPage])

  // handle filter
  useEffect(() => { 
    handleFiltering(projects, searchKey, checkByOld, checkByLatest, optionCreatedAt, techFilterList)
  }, [searchKey, checkByOld, checkByLatest, optionCreatedAt, techFilterList])

  // handle project like count
  useEffect(() => {
    (async() => {
      if(isLikeProject) {
        if(!isRegister || guestId === '') {
          await createNewUser('', 'guest', 'likePost')
        }
        await updateProjectLikeCount( projectsDispatch, projectId, likeProjectCount, isLikeProjectOpt)

        setLoading(projectsDispatch, false)
        setProjectId('')
        setIsLikeProjectOpt('')
        setLikeProjectCount(0)
        setIsLikeProject(false)
      }
    })();
  }, [isLikeProject])

  // handle pagination
  const pagination = () => {
    let times = 2
    let totalData = projects.length
    let groupNum = []

    groupNum.push(projectsPerGroup)
    for(let i = 0; i < times; i++) {
      if((projectsPerGroup * (i + 2)) < totalData) groupNum.push(projectsPerGroup * (i + 2))
    }
    groupNum.push(totalData)

    return <Paginate 
      pageNumber={pageNumber} 
      currentPage={currentPage} setCurrentPage={setCurrentPage}
      dataPerPage={projectsPerPage} setDataPerPage={setProjectsPerPage}
      groupNum={groupNum}
    />
  }

  return (
    <>
      {pagination()}
      <div className={classes.cards}>
        {filteredProjects.length > 0 && filteredProjects
        .slice((currentPage * projectsPerPage) - projectsPerPage, currentPage * projectsPerPage)
        .map(proj => (
          <Card key={proj._id} className={theme.palette.type === 'light' ? classes.card : classNames(classes.card, classes.cardLight)}>
            <input 
              type="text" 
              ref={e => setLink2Copy(e)} 
              value={proj.liveUrls.code}
              style={{position: 'absolute', left: '-10000000000px'}} 
            />
            <CardHeader
              avatar={
                <Avatar aria-label="javascript" className={classes.avatar}>
                  Js
                </Avatar>
              }
              action={proj.liveUrls.code &&
                <Tooltip TransitionComponent={Zoom} title={copyLinkSuccess === proj._id ? 'Copied!' : 'Copy Link'} placement="left-end">
                  <IconButton aria-label="share" 
                    onClick={e => {
                      link2Copy.select()
                      document.execCommand('copy')
                      setCopyLinkSuccess(proj._id)
                      setTimeout(() => setCopyLinkSuccess(''), 5000)
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              }
              title={proj.name}
              subheader={new Date(proj.publishedAt).toDateString()}
            />
            {/* <CardMedia
              className={classes.media}
              image={`/images/${proj.imgSrc}`}
              title={proj.name}
            /> */}
            <img
              className={classes.media}
              src={`/images/${proj.imgSrc}`}
            />
            <CardContent>
              <ul className={classes.techList}>
                {proj.techs.map(tech => (
                  <li key={tech._id} className={theme.palette.type === 'light' ? classes.techItem : classNames(classes.techItem, classes.techItemLight)}>
                    {tech.name}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardActions disableSpacing>
              <Tooltip TransitionComponent={Zoom} title={`${numberFormatting(1100)} likes`} placement="top-start">
                {likeProjects.includes(proj._id) ? (
                  <IconButton aria-label="like" className={classes.iconCtaLike}
                    onClick={() => {
                      setLikeProjects(() => likeProjects.filter(like => like !== guestId))
                      setProjectId(proj._id)
                      setIsLikeProjectOpt('minus')
                      setLikeProjectCount(proj.like)
                      setIsLikeProject(true)
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label="like" 
                    onClick={() => {
                      setLikeProjects([...likeProjects, guestId])
                      setProjectId(proj._id)
                      setIsLikeProjectOpt('add')
                      setLikeProjectCount(proj.like)
                      setIsLikeProject(true)
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                )}
              </Tooltip>
              {proj.liveUrls.code && (
                <Tooltip TransitionComponent={Zoom} title="View Code" placement="top-start">
                  <IconButton aria-label="code" classes={{root: classes.iconCtaCode }}
                    onClick={() => goToPage(proj.liveUrls.code)}
                  >
                    <CodeIcon /> 
                  </IconButton>
                </Tooltip>
              )}
              {proj.liveUrls.www && (
                <Tooltip TransitionComponent={Zoom} title="View Web" placement="top-start">
                  <IconButton aria-label="web" classes={{root: classes.iconCtaWeb }}
                    onClick={() => goToPage(proj.liveUrls.www)}
                  >
                    <PublicIcon />
                  </IconButton>
                </Tooltip>
              )}
              {proj.description && (
                <>
                  {projectDescExpended && projectDescExpended === proj._id ? (
                    <IconButton
                      className={classes.shrink}
                      onClick={() => setProjectDescExpended('')}
                      aria-expanded={projectDescExpended}
                      aria-label="show less"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      className={classes.expand}
                      onClick={() => setProjectDescExpended(proj._id)}
                      aria-expanded={projectDescExpended}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  )}
                </>
              )}
            </CardActions>
            <Collapse 
              in={(() => {
                if(projectDescExpended === proj._id) return true
                else return false
              })()}
              timeout="auto" 
              unmountOnExit
            >
              <CardContent className={theme.palette.type === 'light' ? classNames(markdownStyles.mdContainer, markdownStyles.mdContainerDark) : classNames(markdownStyles.mdContainer, markdownStyles.mdContainerLight)}>
                <ReactMarkDown 
                  source={proj.description}
                  renderers={{ code: Markdown }}
                  // ![alt text](/images/Deku.PNG#thumbnail_fw)
                />
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </div>
      {pagination()}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  cards: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    maxWidth: 345,
    margin: '1rem 0 1rem 0',
    [theme.breakpoints.up('sm')]: {
      margin: '1rem',
    },
    backgroundColor: theme.palette.grey[100],
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
  media: {
    width: '100%',
    height: '100%',
    // width: 345,
    // height: 185.15,
    // paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    // transition: theme.transitions.create('transform', {
    //   duration: theme.transitions.duration.shortest,
    // }),
  },
  shrink: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto',
    // transition: theme.transitions.create('transform', {
    //   duration: theme.transitions.duration.shortest,
    // }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  techList: {
    maxWidth: '100%',
    maxHeight: 78,
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'auto'
  },
  techItem: {
    listStyle: 'none',
    color: theme.palette.common.black,
    backgroundColor: theme.palette.grey[200],
    borderRadius: 5,
    padding: '6px 12px',
    margin: '3px 3px'
  },
  techItemLight: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.lighten.main,
  },
  iconCtaLike: {
    color: theme.palette.secondary.main
  },
  iconCtaCode: {
    '&:hover': {
      color: theme.palette.warning.main
    }
  },
  iconCtaWeb: {
    '&:hover': {
      color: theme.palette.error.main
    }
  },
}))