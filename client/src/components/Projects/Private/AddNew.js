import React, { useState, useEffect } from 'react'
import { useProjects } from '../../../contexts/Projects/Private/ProjectsState'
import { setLoading, setError, setSuccess, addProject } from '../../../contexts/Projects/Private/ProjectsAction'
import { UsersState } from '../../../contexts/Users/Private/UsersState'
import { TechnologyState } from '../../../contexts/Technology/TechnologyState'
import AlertMessage from '../../global/Alert'
import Headline from '../../global/Headline'
import Creators from '../../global/Creators'
import { Technologies } from '../../global/Technologies'
import ReactMarkDown from 'react-markdown'
import Markdown from '../../global/Markdown'
import classNames from 'classnames'
import InputStyles from '../../global/InputStyles'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Button, FormControl, FormGroup, Grid, IconButton, InputLabel, TextField, Tooltip, Typography, Zoom } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'

const AddNew = ({
  // projectsDispatch, error, success, message,
  globalClasses,
  ImgFileTypes,
  isEdit, setIsEdit,
  addNewRef,
  handleProjectUpdate,
  setProjectId,
  projectNameChange, setProjectNameChange,
  projectWwwChange, setProjectWwwChange,
  projectCodeChange, setProjectCodeChange,
  projectTechsChange, setProjectTechsChange,
  projectDescChange, setProjectDescChange,
  projectSubDescChange, setProjectSubDescChange,
  projectCreatorChange, setProjectCreatorChange,
  setCurrentCreator
}) => {
  const [projectsState, projectsDispatch] = useProjects()
  const { error, success, message } = projectsState

  const classes = useStyles()
  const theme = useTheme()
  const { inputClasses } = InputStyles()
  const [projectName, setProjectName] = useState('')
  const [projectImg, setProjectImg] = useState('')
  const [projectWww, setProjectWww] = useState('')
  const [projectCode, setProjectCode] = useState('')
  const [projectTechs, setProjectTechs] = useState([])
  const [projectDesc, setProjectDesc] = useState('')
  const [projectSubDesc, setProjectSubDesc] = useState('')

  // add new project
  const handleProjectAdd = async() => {
    if(!projectImg) return setError(projectsDispatch, { status: true, message: 'Cannot send blank file!' })

    await addProject(projectsDispatch, {
      name: projectName,
      www: projectWww,
      code: projectCode,
      techs: projectTechs,
      desc: projectDesc,
      subDesc: projectSubDesc,
      imgSrc: projectImg,
    })

    setLoading(projectsDispatch, false)
    setProjectImg('')
    setProjectName('')
    setProjectWww('')
    setProjectCode('')
    setProjectTechs([])
    setProjectDesc('')
    setProjectSubDesc('')
  }

  return (
    <>
      <Headline headline="Add New" subHeadline="PROJECT" />
      <form ref={addNewRef} className={classes.form}
        onSubmit={e => {
          e.preventDefault()
          if(isEdit)  handleProjectUpdate()
          else handleProjectAdd()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={projectsDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={projectsDispatch} message={message} 
                setStatus={setSuccess}
              />
            )}
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                {isEdit ? (
                  <FormControl required variant="outlined" className={classes.formControl}>
                    <InputLabel 
                      id="creatorsLabel"
                      classes={{
                        root: inputClasses.selectFieldLabelRoot,
                        focused: inputClasses.selectFieldLabelFocused,
                        // notchedOutline: classes.selectFieldLabelNotchedOutline,
                      }}
                    >
                      Creator
                    </InputLabel>
                    <UsersState>
                      <Creators 
                        creatorChange={projectCreatorChange} setCreatorChange={setProjectCreatorChange}
                      />
                    </UsersState>
                  </FormControl>
                ) : (
                  <>
                    <input 
                      accept="image/*" 
                      className={globalClasses.photoInput} 
                      id="icon-button-file" 
                      type="file"
                      onChange={(e) => {
                        let selectedImg = e.target.files[0]
        
                        if(selectedImg && ImgFileTypes.includes(selectedImg.type)) setProjectImg(selectedImg)
                      }} 
                      required 
                    />
                    <label htmlFor="icon-button-file"  className={globalClasses.photoLabel}>
                      <Tooltip TransitionComponent={Zoom} title="Add photo" placement="top-start">
                        <IconButton color="primary" aria-label="upload picture" component="span" classes={{root: globalClasses.iconButtonPhoto}}>
                          <PhotoCamera /> 
                        </IconButton>
                      </Tooltip>
                      <Typography className={globalClasses.photoLabelText} variant="subtitle1">
                        {projectImg ? projectImg.name : 'No Image Selected'}
                      </Typography>
                    </label>
                  </>
                )}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <TextField 
                  label="Name"
                  variant="outlined"
                  value={isEdit ? projectNameChange : projectName}
                  onChange={(e) => isEdit ? setProjectNameChange(e.target.value) : setProjectName(e.target.value)} 
                  required
                  InputLabelProps={{
                    classes: {
                      root: inputClasses.textFieldLabel,
                      focused: inputClasses.textFieldLabelFocused
                    }
                  }}
                  InputProps={{
                    classes: {
                      root: inputClasses.textFieldRoot,
                      focused: inputClasses.textFieldFocused,
                      notchedOutline: inputClasses.textFieldNotchedOutline
                    }
                  }}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <TextField 
                  label="Live Web Link"
                  variant="outlined"
                  value={isEdit ? projectWwwChange : projectWww}
                  onChange={(e) => isEdit ? setProjectWwwChange(e.target.value) : setProjectWww(e.target.value)} 
                  required
                  InputLabelProps={{
                    classes: {
                      root: inputClasses.textFieldLabel,
                      focused: inputClasses.textFieldLabelFocused
                    }
                  }}
                  InputProps={{
                    classes: {
                      root: inputClasses.textFieldRoot,
                      focused: inputClasses.textFieldFocused,
                      notchedOutline: inputClasses.textFieldNotchedOutline
                    }
                  }}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <TextField 
                  label="Live Code Link"
                  variant="outlined"
                  value={isEdit ? projectCodeChange : projectCode}
                  onChange={(e) => isEdit ? setProjectCodeChange(e.target.value) : setProjectCode(e.target.value)} 
                  required
                  InputLabelProps={{
                    classes: {
                      root: inputClasses.textFieldLabel,
                      focused: inputClasses.textFieldLabelFocused
                    }
                  }}
                  InputProps={{
                    classes: {
                      root: inputClasses.textFieldRoot,
                      focused: inputClasses.textFieldFocused,
                      notchedOutline: inputClasses.textFieldNotchedOutline
                    }
                  }}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <FormControl required variant="outlined" className={classes.formControl}>
                  <InputLabel 
                    id="techsLabel"
                    classes={{
                      root: inputClasses.selectFieldLabelRoot,
                      focused: inputClasses.selectFieldLabelFocused,
                      // notchedOutline: classes.selectFieldLabelNotchedOutline,
                    }}
                  >
                    Techs
                  </InputLabel>
                  <TechnologyState>
                    <Technologies 
                      techsPassed={projectTechs}
                      setTechsPassed={setProjectTechs}
                      isEdit={isEdit}
                      techsChange={projectTechsChange}
                      setTechsChange={setProjectTechsChange}
                    />
                  </TechnologyState>
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <TextField 
                  label="Sub Description"
                  variant="outlined"
                  value={isEdit ? projectSubDescChange : projectSubDesc}
                  onChange={(e) => isEdit ? setProjectSubDescChange(e.target.value) : setProjectSubDesc(e.target.value)} 
                  required
                  multiline
                  rowsMax={50}
                  InputLabelProps={{
                    classes: {
                      root: inputClasses.textFieldLabel,
                      focused: inputClasses.textFieldLabelFocused
                    }
                  }}
                  InputProps={{
                    classes: {
                      root: inputClasses.textFieldRoot,
                      focused: inputClasses.textFieldFocused,
                      notchedOutline: inputClasses.textFieldNotchedOutline
                    }
                  }}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <TextField 
                  label="Description"
                  variant="outlined"
                  value={isEdit ? projectDescChange : projectDesc}
                  onChange={(e) => isEdit ? setProjectDescChange(e.target.value) : setProjectDesc(e.target.value)} 
                  required
                  multiline
                  rowsMax={50}
                  InputLabelProps={{
                    classes: {
                      root: inputClasses.textFieldLabel,
                      focused: inputClasses.textFieldLabelFocused
                    }
                  }}
                  InputProps={{
                    classes: {
                      root: inputClasses.textFieldRoot,
                      focused: inputClasses.textFieldFocused,
                      notchedOutline: inputClasses.textFieldNotchedOutline
                    }
                  }}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={6}
              style={{
                borderRadius: 10,
                backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.lighten.light
              }}
            >
              <ReactMarkDown 
                source={isEdit ? projectDescChange : projectDesc}
                renderers={{ code: Markdown }}
                // ![alt text](/images/Deku.PNG#thumbnail_fw)
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {isEdit && (
              <Button 
                variant="contained" 
                className={classNames(classes.ctaCancel, globalClasses.photoChangeFormSubmitBtn)}
                onClick={() => {
                  setProjectNameChange('')
                  setProjectWwwChange('')
                  setProjectCodeChange('')
                  setProjectTechsChange([])
                  setProjectDescChange('')
                  setProjectSubDescChange('')
                  setProjectCreatorChange('')
                  setCurrentCreator('')
                  setProjectId('')
                  setIsEdit(false)
                }}
              >
                Cancel
              </Button>
            )}
            <Button 
              type="submit"
              variant="contained" 
              color="secondary" 
              className={globalClasses.photoChangeFormSubmitBtn}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}


export default AddNew

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formControl: {
    maxWidth: '100%',
  },
  ctaCancel: {
    backgroundColor: theme.palette.error.main,
    marginRight: '1rem'
  },
}))