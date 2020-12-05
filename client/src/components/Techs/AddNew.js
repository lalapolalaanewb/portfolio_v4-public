import React, { useState } from 'react'
import { useTechnology } from '../../contexts/Technology/TechnologyState'
import { setLoading, setSuccess, setError, addTech } from '../../contexts/Technology/TechnologyAction'
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
  handleTechUpdate,
  setTechId,
  nameChange, setNameChange,
  abbreviationChange, setAbbreviationChange,
  creatorChange, setCreatorChange
}) => {
  const [techState, techDispatch] = useTechnology()
  const { success, error, message } = techState
  
  /** theme & style - states */
  const { inputClasses } = InputStyles()

  /** tech add - states */
  const [name, setName] = useState('')
  const [abbreviation, setAbbreviation] = useState('')

  /** tech add - function */
  const handleTechAdd = async() => {
    await addTech(techDispatch, { name, abbreviation })

    setLoading(techDispatch, false)
    setName('')
    setAbbreviation('')
  }

  return (
    <>
      <Headline headline="Add New" subHeadline="TECH" />
      <form ref={addNewRef} className={inputClasses.form}
        onSubmit={e => {
          e.preventDefault()
          if(isEdit) handleTechUpdate()
          else handleTechAdd()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={techDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={techDispatch} message={message} 
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
                  setTechId('')
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