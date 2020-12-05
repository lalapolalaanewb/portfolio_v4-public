import React, { useState } from 'react'
import { useSocial } from '../../../contexts/User/Private/Social/SocialState'
import { setLoading, setError, setSuccess, addSocial } from '../../../contexts/User/Private/Social/SocialAction'
import { MediaSocialState } from '../../../contexts/MediaSocial/MediaSocialState'
import AlertMessage from '../../../components/global/Alert'
import Headline from '../../../components/global/Headline'
import MediaSocials from './Child/MediaSocials'
import classNames from 'classnames'
import InputStyles from '../../../components/global/InputStyles'
import { 
  Button,
  FormControl,
  FormGroup, 
  Grid, 
  InputLabel,
  TextField,
} from '@material-ui/core'

const AddNewSocial = ({
  addNewRef,
  isEdit, setIsEdit,
  handleSocialUpdate,
  setSocialId,
  nameChange, setNameChange,
  iconChange, setIconChange,
  urlChange, setUrlChange,
}) => {
  const [socialState, socialDispatch] = useSocial()
  const { creator, error, success, message } = socialState

  /** theme & style - states */
  const { inputClasses } = InputStyles()

  /** social add new - states */
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('')
  const [url, setUrl] = useState('')

  /** social add new - function */
  const handleSocialAdd = async() => {
    await addSocial(socialDispatch, { name, icon, url, creator })

    setLoading(socialDispatch, false)
    setName('')
    setIcon('')
    setUrl('')
  }

  return (
    <>
      <Headline headline={isEdit ? 'Edit Existing' : 'Add New'} subHeadline="SOCIAL" />
      <form ref={addNewRef} className={inputClasses.form}
        onSubmit={e => {
          e.preventDefault()
          if(isEdit) handleSocialUpdate()
          else handleSocialAdd()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={socialDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={socialDispatch} message={message} 
                setStatus={setSuccess}
              />
            )}
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormGroup>
                <TextField 
                  label="Name"
                  variant="outlined"
                  value={isEdit ? nameChange : name}
                  onChange={(e) => isEdit ? setNameChange(e.target.value) : setName(e.target.value)} 
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
                <FormControl required variant="outlined" className={inputClasses.formControl}>
                  <InputLabel 
                    id="iconLabel"
                    classes={{
                      root: inputClasses.selectFieldLabelRoot,
                      focused: inputClasses.selectFieldLabelFocused,
                      // notchedOutline: classes.selectFieldLabelNotchedOutline,
                    }}
                  >
                    Icon
                  </InputLabel>
                  <MediaSocialState>
                    <MediaSocials
                      isEdit={isEdit}
                      icon={icon} setIcon={setIcon} 
                      iconChange={iconChange} setIconChange={setIconChange} 
                    />
                  </MediaSocialState>
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormGroup>
                <TextField 
                  label="Url"
                  variant="outlined"
                  value={isEdit ? urlChange : url}
                  onChange={(e) => isEdit ? setUrlChange(e.target.value) : setUrl(e.target.value)} 
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
            {isEdit && (
              <Button 
                variant="contained" 
                className={classNames(inputClasses.ctaCancel, inputClasses.formBtns)}
                onClick={() => {
                  setNameChange('')
                  setIconChange('')
                  setUrlChange('')
                  setSocialId('')
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
                  setNameChange('')
                  setIconChange('')
                  setUrlChange('')
                }
                else {
                  setName('')
                  setIcon('')
                  setUrl('')
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

export default AddNewSocial