import React, { useState } from 'react'
import { usePosts } from '../../../contexts/Posts/Private/PostsState'
import { setLoading, setError, setSuccess, addPost } from '../../../contexts/Posts/Private/PostsAction'
import { UsersState } from '../../../contexts/Users/Private/UsersState'
import { TechnologyState } from '../../../contexts/Technology/TechnologyState'
import AlertMessage from '../../global/Alert'
import Headline from '../../global/Headline'
import Creators from '../../global/Creators'
import Technologies from './Child/Technologies'
import ReactMarkDown from 'react-markdown'
import Markdown from '../../global/Markdown'
import classNames from 'classnames'
import InputStyles from '../../global/InputStyles'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { 
  Button, 
  FormControl, 
  FormGroup, 
  Grid, 
  IconButton, 
  InputLabel, 
  TextField, 
  Tooltip, 
  Typography, 
  Zoom 
} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import './Styles.css'

const AddNew = ({
  globalClasses,
  ImgFileTypes, addNewRef, 
  isEdit, setIsEdit,
  handlePostUpdate,
  setPostId,
  titleChange, setTitleChange,
  excerptChange, setExcerptChange,
  techChange, setTechChange,
  descChange, setDescChange,
  creatorChange, setCreatorChange,
  setCurrentCreator,
}) => {
  const [postsState, postsDispatch] = usePosts()
  const { error, success, message } = postsState
  
  /** page specific states & functions */
  /** theme & style - states */
  const classes = useStyles()
  const theme = useTheme()
  const { inputClasses } = InputStyles()

  /** post add new - states */
  const [title, setTitle] = useState('')
  const [img, setImg] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [tech, setTech] = useState('')
  const [desc, setDesc] = useState('')

  /** post add new - function */
  const handlePostAdd = async() => {
    if(!img) return setError(postsDispatch, { status: true, message: 'Cannot send blank file!' })

    await addPost(postsDispatch, { title, img, excerpt, tech, desc })

    setLoading(postsDispatch, false)
    setTitle('')
    setImg('')
    setExcerpt('')
    setTech('')
    setDesc('')
  }

  return (
    <>
      <Headline headline="Add New" subHeadline="POST" />
      <form ref={addNewRef} className={inputClasses.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={postsDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={postsDispatch} message={message} 
                setStatus={setSuccess}
              />
            )}
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                {isEdit ? (
                  <FormControl required variant="outlined" className={inputClasses.formControl}>
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
                        creatorChange={creatorChange} setCreatorChange={setCreatorChange}
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
        
                        if(selectedImg && ImgFileTypes.includes(selectedImg.type)) setImg(selectedImg)
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
                        {img ? img.name : 'No Image Selected'}
                      </Typography>
                    </label>
                  </>
                )}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <TextField 
                  label="Ttile"
                  variant="outlined"
                  value={isEdit ? titleChange : title}
                  onChange={(e) => isEdit ? setTitleChange(e.target.value) : setTitle(e.target.value)} 
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
                  label="Excerpt"
                  variant="outlined"
                  value={isEdit ? excerptChange : excerpt}
                  onChange={(e) => isEdit ? setExcerptChange(e.target.value) : setExcerpt(e.target.value)} 
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
                <FormControl required variant="outlined" className={inputClasses.formControl}>
                  <InputLabel 
                    id="techLabel"
                    classes={{
                      root: inputClasses.selectFieldLabelRoot,
                      focused: inputClasses.selectFieldLabelFocused,
                      // notchedOutline: classes.selectFieldLabelNotchedOutline,
                    }}
                  >
                    Tech
                  </InputLabel>
                  <TechnologyState>
                    <Technologies 
                      tech={tech} setTech={setTech}
                      isEdit={isEdit}
                      techChange={techChange} setTechChange={setTechChange}
                    />
                  </TechnologyState>
                </FormControl>
              </FormGroup>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <TextField 
                  label="Description"
                  variant="outlined"
                  value={isEdit ? descChange : desc}
                  onChange={(e) => isEdit ? setDescChange(e.target.value) : setDesc(e.target.value)} 
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
                source={isEdit ? descChange : desc}
                renderers={{ code: Markdown }}
                // ![alt text](/images/Deku.PNG#thumbnail_fw)
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {isEdit && (
              <Button 
                variant="contained" 
                className={classNames(inputClasses.ctaCancel, globalClasses.photoChangeFormSubmitBtn)}
                onClick={() => {
                  setTitleChange('')
                  setExcerptChange('')
                  setTechChange('')
                  setDescChange('')
                  setCreatorChange('')
                  setCurrentCreator('')
                  setPostId('')
                  setIsEdit(false)
                }}
              >
                Cancel
              </Button>
            )}
            <Button 
              variant="contained" 
              color="secondary" 
              className={globalClasses.photoChangeFormSubmitBtn}
              onClick={e => {
                e.preventDefault()
                if(isEdit) handlePostUpdate()
                else handlePostAdd()
              }}
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

const useStyles = makeStyles(theme => ({}))