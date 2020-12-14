import React, { useState } from 'react'
import { useMedia } from '../../contexts/Media/MediaState'
import { setLoading, setError, setSuccess, addMedias } from '../../contexts/Media/MediaAction'
import { UsersState } from '../../contexts/Users/Private/UsersState'
import AlertMessage from '../global/Alert'
import Headline from '../global/Headline'
import Creators from '../global/Creators'
import classNames from 'classnames'
import InputStyles from '../global/InputStyles'
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

export const AddNew = ({
  addNewRef,
  isEdit, setIsEdit,
  handleMediaUpdate,
  setMediaId,
  imgAltChange, setImgAltChange,
  creatorChange, setCreatorChange,
}) => {
  const [mediaState, mediaDispatch] = useMedia()
  const { error, success, message } = mediaState
  
  /** page specific states & functions */
  /** theme & style - states */
  const classes = useStyles()
  const theme = useTheme()
  const { inputClasses } = InputStyles()

  /** global - states */
  const ImgFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml']

  /** media add new - states */
  const [images, setImages] = useState([])
  const [imgNames, setImgNames] = useState([])

  /** media add new - function */
  const handleMediasAdd = async() => {
    if(images.length < 0) return setError(mediaDispatch, { status: true, message: 'Cannot send blank file!' })

    await addMedias(mediaDispatch, { images })

    setLoading(mediaDispatch, false)
    setImages([])
    setImgNames([])
  }
  
  return (
    <>
      <Headline headline={isEdit ? 'Edit Existing' : 'Add New'} subHeadline="MEDIA" />
      <form 
        ref={addNewRef} 
        className={inputClasses.form}
        onSubmit={e => {
          e.preventDefault()
          if(isEdit) handleMediaUpdate()
          else handleMediasAdd()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={mediaDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={mediaDispatch} message={message} 
                setStatus={setSuccess}
              />
            )}
          </Grid>
          {isEdit ? (
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormGroup>
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
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <TextField 
                    label="Img Alt"
                    variant="outlined"
                    value={imgAltChange}
                    onChange={(e) => setImgAltChange(e.target.value)} 
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
          ) : (
            <Grid item xs={12}>
              <FormGroup required>
                <input 
                  multiple
                  name="files"
                  accept="image/*" 
                  className={classes.photoInput} 
                  id="icon-button-file" 
                  type="file"
                  onChange={(e) => { 
                    let files = e.target.files
                    let images = []
                    let imgNames = []
                    for(let i=0; i < files.length; i++) {
                      if(ImgFileTypes.includes(files[i].type)) {
                        images.push(files[i])
                        imgNames.push(files[i].name)
                      } 
                    }
                    // setImages(files)
                    setImages(images) 
                    setImgNames(imgNames)
                  }} 
                  required 
                />
                <label htmlFor="icon-button-file"  className={classes.photoLabel}>
                  <Tooltip TransitionComponent={Zoom} title="Add photo" placement="top-start">
                    <IconButton color="primary" aria-label="upload picture" component="span" classes={{root: classes.iconButtonPhoto}}>
                      <PhotoCamera /> 
                    </IconButton>
                  </Tooltip>
                  <Typography className={classes.photoLabelText} variant="subtitle1">
                    {imgNames.length > 0 ? imgNames.join(', ') : 'No Image Selected'}
                  </Typography>
                </label>
              </FormGroup>
            </Grid>
          )}
          <Grid item xs={12}>
            {isEdit && (
              <Button 
                variant="contained" 
                className={classNames(inputClasses.ctaCancel, inputClasses.formBtns)}
                onClick={() => {
                  setImgAltChange('')
                  setCreatorChange('')
                  setMediaId('')
                  setIsEdit(false)
                }}
              >
                Cancel
              </Button>
            )}
            <Button 
              variant="contained" 
              className={classNames(inputClasses.ctaReset, inputClasses.formBtns)}
              onClick={e => {
                e.preventDefault()
                if(isEdit) {
                  setImgAltChange('')
                  setCreatorChange('')
                }
                else {
                  setImages([])
                  setImgNames([])
                }
              }}
            >
              Reset
            </Button>
            <Button 
              type="submit"
              variant="contained" 
              color="secondary" 
              className={inputClasses.formBtns}
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
  photoModal: {
    position: 'absolute',
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    minWidth: 220,
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  img: {
    maxWidth: 223,
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
}))