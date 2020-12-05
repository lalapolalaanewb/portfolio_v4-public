import React, { useState } from 'react'
import { useJob } from '../../../contexts/User/Private/Job/JobState'
import { setLoading, setError, setSuccess, addJob } from '../../../contexts/User/Private/Job/JobAction'
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

const AddNewJob = ({
  addNewRef,
  isEdit, setIsEdit,
  handleJobUpdate,
  setJobId,
  nameChange, setNameChange,
  abbreviationChange, setAbbreviationChange,
}) => {
  const [jobState, jobDispatch] = useJob()
  const { creator, error, success, message } = jobState

  /** theme & style - states */
  const { inputClasses } = InputStyles()

  /** job add new - states */
  const [name, setName] = useState('')
  const [abbreviation, setAbbreviation] = useState('')

  /** job add new - function */
  const handleJobAdd = async() => {
    await addJob(jobDispatch, { name, abbreviation, creator })

    setLoading(jobDispatch, false)
    setName('')
    setAbbreviation('')
  }

  return (
    <>
      <Headline headline="Add New" subHeadline="POST" />
      <form ref={addNewRef} className={inputClasses.form}
        onSubmit={e => {
          e.preventDefault()
          if(isEdit) handleJobUpdate()
          else handleJobAdd()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={jobDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={jobDispatch} message={message} 
                setStatus={setSuccess}
              />
            )}
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
          <Grid item xs={12}>
            {isEdit && (
              <Button 
                variant="contained" 
                className={classNames(inputClasses.ctaCancel, inputClasses.formBtns)}
                onClick={() => {
                  setNameChange('')
                  setAbbreviationChange('')
                  setJobId('')
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

export default AddNewJob