import React, { useState, useEffect } from 'react'
import { useSkill } from '../../../contexts/Skill/Private/SkillState'
import { setLoading, setSuccess, setError, addSkill } from '../../../contexts/Skill/Private/SkillAction'
import { UsersState } from '../../../contexts/Users/Private/UsersState'
import { TechnologyState } from '../../../contexts/Technology/TechnologyState'
import AlertMessage from '../../global/Alert'
import Headline from '../../global/Headline'
import Creators from '../../global/Creators'
import { Technologies } from '../../global/Technologies'
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

const AddNew = ({
  isEdit, setIsEdit,
  addNewRef,
  handleSkillUpdate,
  setSkillId,
  nameChange, setNameChange,
  techsChange, setTechsChange,
  creatorChange, setCreatorChange,
  setCurrentCreator
}) => {
  const [skillState, skillDispatch] = useSkill()
  const { success, error, message } = skillState
  
  /** theme & style - states */
  const classes = useStyles()
  const theme = useTheme()
  const { inputClasses } = InputStyles()

  /** skill add - states */
  const [name, setName] = useState('')
  const [techs, setTechs] = useState([])

  /** skill add - function */
  const handleSkillAdd = async() => {
    await addSkill(skillDispatch, {
      name: name,
      techs: techs,
    })

    setLoading(skillDispatch, false)
    setName('')
    setTechs([])
  }

  return (
    <>
      <Headline headline="Add New" subHeadline="SKILL" />
      <form ref={addNewRef} className={inputClasses.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={skillDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={skillDispatch} message={message} 
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
                <FormControl required variant="outlined" className={inputClasses.formControl}>
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
                      techsPassed={techs}
                      setTechsPassed={setTechs}
                      isEdit={isEdit}
                      techsChange={techsChange}
                      setTechsChange={setTechsChange}
                    />
                  </TechnologyState>
                </FormControl>
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
                  setTechsChange([])
                  setCreatorChange('')
                  setCurrentCreator('')
                  setSkillId('')
                  setIsEdit(false)
                }}
              >
                Cancel
              </Button>
            )}
            <Button 
              variant="contained" 
              color="secondary" 
              className={inputClasses.formBtns}
              onClick={e => {
                e.preventDefault()
                if(isEdit) handleSkillUpdate()
                else handleSkillAdd()
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