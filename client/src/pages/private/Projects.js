import React, { useState, useEffect, useRef } from 'react'
import { useProjects } from '../../contexts/Projects/Private/ProjectsState'
import { setLoading, setError, getProjects, updateProjectImg, updateProjectPublish, updateProject, deleteProject } from '../../contexts/Projects/Private/ProjectsAction'
import AlertMessage from '../../components/global/Alert'
import Headline from '../../components/global/Headline'
import { DividerBlank } from '../../components/global/Divider'
import { TableCustom, TableHeadCustom } from '../../components/global/Table'
import AddNew from '../../components/Projects/Private/AddNew'
import ReactMarkDown from 'react-markdown'
import Markdown from '../../components/global/Markdown'
import { MarkDownStyles } from '../../components/global/Markdown'
import classNames from 'classnames'
import { easing, makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Collapse,
  FormGroup,
  IconButton,
  ListItem,
  ListItemText,
  TableBody, TableCell, TableRow, 
  Tooltip, 
  Typography, 
  Zoom,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import PublishIcon from '@material-ui/icons/Publish'
import GetAppIcon from '@material-ui/icons/GetApp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const ProjectsPrivate = () => {
  const [projectsState, projectsDispatch] = useProjects()
  const { projects, loading, success, error, message } = projectsState

  /** page specific states and functions */
  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** markdown - states */
  const { markdownStyles } = MarkDownStyles()

  /** global - states */
  const addNewRef = useRef(null)
  const ImgFileTypes = ['image/png', 'image/jpeg']
  const [projectId, setProjectId] = useState('')

  /** table - states */
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openRow, setOpenRow] = useState(false)

  /** project img change - states */
  const [projectImgChange, setProjectImgChange] = useState('')
  const [projectImgSrc, setProjectImgSrc] = useState('')
  const [isPhotoChange, setIsPhotoChange] = useState(false)

  /** project publish change - states */
  const [intention, setIntention] = useState('')
  const [isPublish, setIsPublish] = useState(false)

  /** project update - states */
  const [projectNameChange, setProjectNameChange] = useState('')
  const [projectWwwChange, setProjectWwwChange] = useState('')
  const [projectCodeChange, setProjectCodeChange] = useState('')
  const [projectTechsChange, setProjectTechsChange] = useState([])
  const [projectDescChange, setProjectDescChange] = useState('')
  const [projectSubDescChange, setProjectSubDescChange] = useState('')
  const [projectCreatorChange, setProjectCreatorChange] = useState('')
  const [currentCreator, setCurrentCreator] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** table - function */
  // table row - handle change of page function
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }
  // table row - handle change of page row function
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  /** projects get all - function */
  useEffect(() => {
    (async() => {
      await getProjects(projectsDispatch)

      setLoading(projectsDispatch, false)
    })();
  }, [])

  /** project img change - function */
  const handleProjectImgUpdate = async() => {
    if(!projectImgChange) return setError(projectsDispatch, { status: true, message: 'Cannot send blank file!' })
    
    await updateProjectImg(projectsDispatch, projectId, projectImgChange, projectImgSrc)

    setLoading(projectsDispatch, false)
    setProjectId('')
    setProjectImgChange('')
    setProjectImgSrc('')
    setIsPhotoChange(false)
  }

  /** project publish change - function */
  useEffect(() => {
    (async() => {
      if(isPublish) {
        await updateProjectPublish(projectsDispatch, projectId, intention)

        setLoading(projectsDispatch, false)
        setProjectId('')
        setIntention('')
        setIsPublish(false)
      }
    })()
  }, [isPublish])

  /** project update - function */
  const handleProjectUpdate = async() => {
    await updateProject(projectsDispatch, projectId, {
      name: projectNameChange,
      www: projectWwwChange,
      code: projectCodeChange,
      techs: projectTechsChange,
      description: projectDescChange,
      subDescription: projectSubDescChange,
      creator: {
        current: currentCreator,
        new: projectCreatorChange
      }
    })

    setLoading(projectsDispatch, false)
    setProjectId('')
    setProjectNameChange('')
    setProjectWwwChange('')
    setProjectCodeChange('')
    setProjectTechsChange([])
    setProjectDescChange('')
    setProjectSubDescChange('')
    setProjectCreatorChange('')
    setCurrentCreator('')
    setIsEdit(false)
  }
  
  /** project delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteProject(projectsDispatch, projectId, currentCreator)

        setLoading(projectsDispatch, false)
        setProjectId('')
        setCurrentCreator('')
        setIsDelete(false)
      }
    })();
  }, [isDelete])

  return (
    <>
      <Headline headline="Projects" subHeadline="TABLE" />
      {loading && <div className="lds-hourglass accents-ver"></div>}
      {error && (
        <AlertMessage
          severity="warning" title="Warning"
          dispatch={projectsDispatch} message={message} 
          setStatus={setError}
        />
      )}
      <TableCustom 
        rowsPerPageOptions={[5, 10, 25]}
        count={projects.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      >
        <TableHeadCustom>
          <TableCell/>
          <TableCell>Image</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Www</TableCell>
          <TableCell>Code</TableCell>
          <TableCell>Techs</TableCell>
          <TableCell>Creator</TableCell>
          <TableCell>Actions</TableCell>
        </TableHeadCustom>
        <TableBody>
          {projects.length > 0 ? 
          projects
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((project, index) => (
            <React.Fragment key={project._id}>
              <TableRow className={project.status === 0 && (() => theme.palette.type === 'light' ? classes.unPublished : classes.unPublishedLight)()}>
                <TableCell>
                  {project.description && ( 
                    <IconButton size="small" 
                      onClick={() => {
                        setProjectId(() => openRow ? '' : project._id)
                        setOpenRow(!openRow)
                      }}
                    >
                      {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className={classes.projectImgContainer}>
                    {isPhotoChange && projectId === project._id ? (
                      <form className={classes.photoChangeForm}>
                        <FormGroup>
                          <input 
                            accept="image/*" 
                            className={classes.photoInput} 
                            id="icon-button-file-change"
                            type="file"
                            onChange={(e) => {
                              let selectedImg = e.target.files[0]
                              
                              if(selectedImg && ImgFileTypes.includes(selectedImg.type)) setProjectImgChange(selectedImg)
                            }} 
                            required 
                          />
                          <label htmlFor="icon-button-file-change"  className={classes.photoLabel}>
                            <Tooltip TransitionComponent={Zoom} title="Add photo" placement="top-start">
                              <IconButton color="primary" aria-label="upload picture" component="span" classes={{root: classes.iconButtonPhoto}}>
                                <PhotoCamera /> 
                              </IconButton>
                            </Tooltip>
                            {projectImgChange ? (
                              <Typography className={classes.photoLabelText} variant="subtitle1" noWrap>
                                {projectImgChange.name}
                              </Typography>
                            ) : (
                              <Typography className={classes.photoLabelText} variant="subtitle1" noWrap>
                                No Image Selected
                              </Typography>
                            )}
                          </label>
                        </FormGroup>
                        <Button  
                          variant="contained" 
                          color="secondary" 
                          className={classes.photoChangeFormSubmitBtn}
                          onClick={e => {
                            // e.preventDefault()
                            handleProjectImgUpdate()
                          }}
                        >
                          Change Photo
                        </Button>
                      </form>
                    ) : (<>{project.imgSrc && <img src={`/images/${project.imgSrc}`} alt={`${project.name}`} className={classes.projectImg}/>}</>)}
                    <Tooltip TransitionComponent={Zoom} title="Change photo" placement="right-start"
                      onClick={() => {
                        if(isPhotoChange) {
                          setProjectId('')
                          setProjectImgChange('')
                          setProjectImgSrc('')
                          setIsPhotoChange(false)
                        } else {
                          setProjectId(project._id)
                          setProjectImgSrc(project.imgSrc)
                          setIsPhotoChange(true)
                          setIsEdit(false)
                          setProjectNameChange('')
                          setProjectWwwChange('')
                          setProjectCodeChange('')
                          setProjectTechsChange([])
                          setProjectDescChange('')
                          setProjectSubDescChange('')
                          setProjectCreatorChange('')
                          setCurrentCreator('')
                        }
                      }}
                    >
                      {isPhotoChange && projectId === project._id ? <CloseIcon className={classNames(classes.iconButtonPhotoChange, classes.photoChangeOnHoverFalse)}/> : <PhotoCamera className={classNames(classes.iconButtonPhotoChange, classes.photoChangeOnHoverTrue)}/>}
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {project.name}
                </TableCell>
                <TableCell className={classNames(classes.tableCell, classes.liveUrls)}>
                  {project.liveUrls.www ? (
                    <Tooltip TransitionComponent={Zoom} title="Visit link" placement="top"
                      style={{cursor: 'pointer'}}
                      onClick={() => window.open(project.liveUrls.www, '_blank')}
                    >
                      <Typography variant="body1">
                        {project.liveUrls.www}
                      </Typography>
                    </Tooltip>
                  ) : 'none'}
                </TableCell>
                <TableCell className={classNames(classes.tableCell, classes.liveUrls)}>
                  {project.liveUrls.code ? (
                    <Tooltip TransitionComponent={Zoom} title="Visit link" placement="top"
                      style={{cursor: 'pointer'}}
                      onClick={() => window.open(project.liveUrls.code, '_blank')}
                    >
                      <Typography variant="body1">
                        {project.liveUrls.code}
                      </Typography>
                    </Tooltip>
                  ) : 'none'}
                </TableCell>
                <TableCell className={classNames(classes.tableCell, classes.liveUrls)}>
                  <div className={classes.listItemTechs}>
                    {project.techs && project.techs.map(tech => (
                      <ListItem key={tech._id}
                        classes={{root: classes.listItemTech}}
                      >
                        <ListItemText primary={tech.name}/>
                      </ListItem>
                    ))}
                  </div>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {project.creator.name.firstName}
                </TableCell>
                <TableCell>
                  <div className={classes.ctaBtns}>
                    {isEdit && projectId === project._id ? 'Editing...' : (
                      <>
                        <Tooltip TransitionComponent={Zoom} title="Edit" placement="top-end">
                          <IconButton
                            onClick={() => {
                              setProjectNameChange(project.name)
                              project.liveUrls.www ? setProjectWwwChange(project.liveUrls.www) : setProjectWwwChange('none')
                              project.liveUrls.code ? setProjectCodeChange(project.liveUrls.code) : setProjectCodeChange('none')
                              let techs = []
                              project.techs.map(tech => techs.push(tech.name))
                              setProjectTechsChange(techs)
                              project.description ? setProjectDescChange(project.description) : setProjectDescChange('none')
                              setProjectSubDescChange(() => project.subDescription ? project.subDescription : 'none')
                              setProjectCreatorChange(project.creator._id)
                              setCurrentCreator(project.creator._id)
                              setProjectId(project._id)
                              setIsEdit(true)
                              setIsPhotoChange(false)
                              addNewRef.current.scrollIntoView({ behavior: 'smooth' })
                            }}
                          >
                            <EditIcon  style={{color: theme.palette.secondary.main}}/>
                          </IconButton>
                        </Tooltip>
                        {project.status !== 1 && (
                          <Tooltip TransitionComponent={Zoom} title="Delete" placement="top-end">
                            <IconButton
                              onClick={() => {
                                setProjectId(project._id)
                                setCurrentCreator(project.creator._id)
                                setIsDelete(true)
                              }}
                            >
                              <DeleteIcon style={{color: theme.palette.error.main}}/>
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip TransitionComponent={Zoom} title={project.status === 0 ? 'Publish' : 'Unpublish'} placement="top-end">
                          <IconButton
                            onClick={() => {
                              setProjectId(project._id)
                              setIntention((() => project.status === 0 ? 'publish' : 'unpublish')())
                              setIsPublish(true)
                            }}
                          >
                            {project.status === 0 ? <PublishIcon style={{color: theme.palette.warning.main}}/> : <GetAppIcon style={{color: theme.palette.error.main}}/>}
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell 
                  colSpan={12} 
                  style={{
                    paddingBottom: 0, 
                    paddingTop: 0,
                    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.lighten.light 
                  }}
                  className={theme.palette.type === 'light' ? classNames(markdownStyles.mdContainer, markdownStyles.mdContainerDark) : classNames(markdownStyles.mdContainer, markdownStyles.mdContainerLight)}
                >
                  <Collapse in={openRow && projectId === project._id} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="body1">{project.subDescription ? project.subDescription : 'none'}</Typography>
                      <ReactMarkDown 
                        source={project.description}
                        renderers={{ code: Markdown }}
                        // ![alt text](/images/Deku.PNG#thumbnail_fw)
                      />
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          )) : (
            <TableRow>
              <TableCell colSpan={12}>
                <Typography variant="body1" align="center">No Data</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableCustom>
      <DividerBlank />
      <AddNew 
        globalClasses={classes}
        ImgFileTypes={ImgFileTypes}
        isEdit={isEdit} setIsEdit={setIsEdit}
        addNewRef={addNewRef}
        handleProjectUpdate={handleProjectUpdate}
        setProjectId={setProjectId}
        projectNameChange={projectNameChange} setProjectNameChange={setProjectNameChange}
        projectWwwChange={projectWwwChange} setProjectWwwChange={setProjectWwwChange}
        projectCodeChange={projectCodeChange} setProjectCodeChange={setProjectCodeChange}
        projectTechsChange={projectTechsChange} setProjectTechsChange={setProjectTechsChange}
        projectDescChange={projectDescChange} setProjectDescChange={setProjectDescChange}
        projectSubDescChange={projectSubDescChange} setProjectSubDescChange={setProjectSubDescChange}
        projectCreatorChange={projectCreatorChange} setProjectCreatorChange={setProjectCreatorChange}
        setCurrentCreator={setCurrentCreator}
      />
    </>
  )
}

export default ProjectsPrivate

const useStyles = makeStyles((theme) => ({
  unPublished: {
    backgroundColor: theme.palette.grey[300]
  },
  unPublishedLight: {
    backgroundColor: theme.palette.lighten.main
  },
  tableCell: {
    minWidth: 180,
  },
  liveUrls: {
    maxWidth: 180,
    overflow: 'auto'
  },
  photoChangeForm: {
    width: 223,
    height: 120,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoChangeFormSubmitBtn: {
    color: theme.palette.common.white,
    marginTop: 20
  },
  projectImgContainer: {
    position: 'relative',
    maxWidth: 273,
    display: 'flex',
    alignItems: 'center',
  },
  projectImg: {
    maxWidth: 223,
  },
  iconButtonPhotoChange: {
    width: 36,
    height: 120,
    margin: '0 5px',
    padding: '0 2px',
    '&:hover': {
      transitions: easing.easeInOut,
      cursor: 'pointer'
    }
  },
  photoChangeOnHoverTrue: {
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.main
    }
  },
  photoChangeOnHoverFalse: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      color: theme.palette.common.black,
      backgroundColor: theme.palette.error.dark
    }
  },
  listItemTechs: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    maxHeight: '100px'
  },
  listItemTech: {
    margin: '0', 
    padding: '0',
  },
  ctaBtns: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
  },
  photoInput: {
    display: 'none'
  },
  iconButtonPhoto: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  deleteBtn: {
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  },
  deleteBtnIcon: {
    color: theme.palette.error.main,
  },
  photoLabel: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
  },
  photoLabelText: {
    marginLeft: '15px',
    width: '100%', 
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  },
}));