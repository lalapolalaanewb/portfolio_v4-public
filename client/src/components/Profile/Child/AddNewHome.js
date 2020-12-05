import React, { useState } from 'react'
import { useHome } from '../../../contexts/User/Private/Home/HomeState'
import { setLoading, setError, setSuccess, addHome } from '../../../contexts/User/Private/Home/HomeAction'
import AlertMessage from '../../../components/global/Alert'
import Headline from '../../../components/global/Headline'
import classNames from 'classnames'
import InputStyles from '../../../components/global/InputStyles'
import { 
  Button, 
  FormControl, 
  FormGroup, 
  Grid, 
  IconButton, 
  InputLabel,
  MenuItem,
  Select, 
  TextField, 
  Tooltip, 
  Typography, 
  Zoom 
} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'

const AddNewHome = ({
  globalClasses,
  ImgFileTypes,
  addNewRef,
  isEdit, setIsEdit,
  handleHomeUpdate,
  setHomeId,
  toplineChange, setToplineChange,
  headlineChange, setHeadlineChange,
  descChange, setDescChange,
  btnPurposeChange, setBtnPurposeChange,
  btnLabelChange, setBtnLabelChange,
  btnLinkChange, setBtnLinkChange,
  imgPosChange, setImgPosChange,
}) => {
  const [homeState, homeDispatch] = useHome()
  const { creator, error, success, message } = homeState

  /** theme & style - states */
  const { inputClasses } = InputStyles()

  /** home add new - states */
  const [img, setImg] = useState('')
  const [topline, setTopline] = useState('')
  const [headline, setHeadline] = useState('')
  const [desc, setDesc] = useState('')
  const [btnPurpose, setBtnPurpose] = useState('')
  const [btnLabel, setBtnLabel] = useState('')
  const [btnLink, setBtnLink] = useState('')
  const [imgPos, setImgPos] = useState('')

  /** home add new - function */
  const handleHomeAdd = async() => {
    if(!img) return setError(homeDispatch, { status: true, message: 'Cannot send blank file!' })

    await addHome(homeDispatch, { img, topline, headline, desc, btnPurpose, btnLabel, btnLink, imgPos, creator })

    setLoading(homeDispatch, false)
    setImg('')
    setTopline('')
    setHeadline('')
    setBtnPurpose('')
    setBtnLabel('')
    setBtnLink('')
    setImgPos('')
    setDesc('')
  }

  return (
    <>
      <Headline headline={isEdit ? 'Edit Existing' : 'Add New'} subHeadline="HOME" />
      <form ref={addNewRef} className={inputClasses.form}
        onSubmit={e => {
          e.preventDefault()
          if(isEdit) handleHomeUpdate()
          else handleHomeAdd()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={homeDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={homeDispatch} message={message} 
                setStatus={setSuccess}
              />
            )}
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              {!isEdit && (
                <FormGroup>
                  <input 
                    accept="image/*" 
                    className={globalClasses.photoInput} 
                    id="icon-button-file" 
                    type="file"
                    onChange={(e) => {
                      let selectedImg = e.target.files[0]
                      // console.log(selectedImg)
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
                </FormGroup>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControl required variant="outlined" className={inputClasses.formControl}>
                  <InputLabel 
                    id="imgPosition"
                    classes={{
                      root: inputClasses.selectFieldLabelRoot,
                      focused: inputClasses.selectFieldLabelFocused,
                      // notchedOutline: classes.selectFieldLabelNotchedOutline,
                    }}
                  >
                    Image Position
                  </InputLabel>
                  <Select
                    labelId="imgPosition"
                    label="Image Position"
                    value={isEdit ? imgPosChange : imgPos}
                    onChange={e => isEdit ? setImgPosChange(e.target.value) : setImgPos(e.target.value)}
                  >
                    <MenuItem value="start">Start</MenuItem>
                    <MenuItem value="end">End</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
          <Grid item xs={12} sm={4}>
              <FormGroup>
                <FormControl required variant="outlined" className={inputClasses.formControl}>
                  <InputLabel 
                    id="btnPurpose"
                    classes={{
                      root: inputClasses.selectFieldLabelRoot,
                      focused: inputClasses.selectFieldLabelFocused,
                      // notchedOutline: classes.selectFieldLabelNotchedOutline,
                    }}
                  >
                    Button Purpose
                  </InputLabel>
                  <Select
                    labelId="btnPurpose"
                    label="Button Purpose"
                    value={isEdit ? btnPurposeChange : btnPurpose}
                    onChange={e => isEdit ? setBtnPurposeChange(e.target.value) : setBtnPurpose(e.target.value)}
                  >
                    <MenuItem value="local">Local (lalapolalaanewb.com)</MenuItem>
                    <MenuItem value="outside">Outside (https/http)</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormGroup>
                <TextField 
                  label="Button Label"
                  variant="outlined"
                  value={isEdit ? btnLabelChange : btnLabel}
                  onChange={(e) => isEdit ? setBtnLabelChange(e.target.value) : setBtnLabel(e.target.value)} 
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
            <Grid item xs={12} md={4}>
              <FormGroup>
                <TextField 
                  label="Button Link"
                  variant="outlined"
                  value={isEdit ? btnLinkChange : btnLink}
                  onChange={(e) => isEdit ? setBtnLinkChange(e.target.value) : setBtnLink(e.target.value)} 
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
                <TextField 
                  label="Topline"
                  variant="outlined"
                  value={isEdit ? toplineChange : topline}
                  onChange={(e) => isEdit ? setToplineChange(e.target.value) : setTopline(e.target.value)} 
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
            <Grid item xs={12} md={6}>
              <FormGroup>
                <TextField 
                  label="Headline"
                  variant="outlined"
                  value={isEdit ? headlineChange : headline}
                  onChange={(e) => isEdit ? setHeadlineChange(e.target.value) : setHeadline(e.target.value)} 
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            {isEdit && (
              <Button 
                variant="contained" 
                className={classNames(inputClasses.ctaCancel, globalClasses.photoChangeFormSubmitBtn)}
                onClick={() => {
                  setToplineChange('')
                  setHeadlineChange('')
                  setDescChange('')
                  setBtnPurposeChange('')
                  setBtnLabelChange('')
                  setImgPosChange('')
                  setHomeId('')
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
                  setToplineChange('')
                  setHeadlineChange('')
                  setDescChange('')
                  setBtnPurposeChange('')
                  setBtnLabelChange('')
                  setImgPosChange('')
                }
                else {
                  setImg('')
                  setTopline('')
                  setHeadline('')
                  setDesc('')
                  setBtnPurpose('')
                  setBtnLabel('')
                  setBtnLink('')
                  setImgPos('')
                }
              }}
            >
              Reset
            </Button>
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

export default AddNewHome