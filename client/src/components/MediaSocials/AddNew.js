import React, { useState } from 'react'
import { useMediaSocial } from '../../contexts/MediaSocial/MediaSocialState'
import { setLoading, setSuccess, setError, addMediaSocial } from '../../contexts/MediaSocial/MediaSocialAction'
import { UsersState } from '../../contexts/Users/Private/UsersState'
import AlertMessage from '../global/Alert'
import Headline from '../global/Headline'
import Creators from '../global/Creators'
import classNames from 'classnames'
import InputStyles from '../global/InputStyles'
import { 
  Button, 
  FormControl, 
  FormGroup, 
  Grid, 
  InputLabel, 
  TextField,
} from '@material-ui/core'

const AddNew = ({
  isEdit, setIsEdit,
  addNewRef,
  handleMediaSocialUpdate,
  setMediaSocialId,
  nameChange, setNameChange,
  abbreviationChange, setAbbreviationChange,
  creatorChange, setCreatorChange
}) => {
  const [mediaSocialState, mediaSocialDispatch] = useMediaSocial()
  const { success, error, message } = mediaSocialState
  
  /** theme & style - states */
  const { inputClasses } = InputStyles()

  /** tech add - states */
  const [name, setName] = useState('')
  const [abbreviation, setAbbreviation] = useState('')

  /** media social add - function */
  const handleMediaSocialAdd = async() => {
    await addMediaSocial(mediaSocialDispatch, { name, abbreviation })

    setLoading(mediaSocialDispatch, false)
    setName('')
    setAbbreviation('')
  }

  return (
    <>
      <Headline headline={isEdit ? 'Edit Existing' : 'Add New'} subHeadline="MEDIA" />
      <form ref={addNewRef} className={inputClasses.form}
        onSubmit={e => {
          e.preventDefault()
          if(isEdit) handleMediaSocialUpdate()
          else handleMediaSocialAdd()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={mediaSocialDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={mediaSocialDispatch} message={message} 
                setStatus={setSuccess}
              />
            )}
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <TextField 
                  label="Abbreviation"
                  variant="outlined"
                  value={isEdit ? abbreviationChange : abbreviation}
                  onChange={(e) => isEdit ? setAbbreviationChange(e.target.value) : setAbbreviation(e.target.value)} 
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
          {isEdit && (
            <Grid item xs={12}>
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
          )}
          <Grid item xs={12}>
            {isEdit && (
              <Button 
                variant="contained" 
                className={classNames(inputClasses.ctaCancel, inputClasses.formBtns)}
                onClick={() => {
                  setNameChange('')
                  setAbbreviationChange('')
                  setCreatorChange('')
                  setMediaSocialId('')
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
                  setAbbreviationChange('')
                  setCreatorChange('')
                }
                else {
                  setName('')
                  setAbbreviation('')
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