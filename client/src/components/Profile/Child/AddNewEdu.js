import React, { useState } from 'react'
import { useEducation } from '../../../contexts/User/Private/Education/EducationState'
import { setLoading, setError, setSuccess, addEdu } from '../../../contexts/User/Private/Education/EducationAction'
import AlertMessage from '../../../components/global/Alert'
import Headline from '../../../components/global/Headline'
import classNames from 'classnames'
import InputStyles from '../../../components/global/InputStyles'
import { 
  Button, 
  FormControl,
  FormGroup, 
  Grid, 
  InputLabel,
  MenuItem,
  Select,
  TextField, 
} from '@material-ui/core'

const AddNewEdu = ({
  addNewRef,
  isEdit, setIsEdit,
  handleEduUpdate,
  setEduId,
  courseChange, setCourseChange,
  titleChange, setTitleChange,
  entityChange, setEntityChange,
  studyStatusChange, setStudyStatusChange,
}) => {
  const [eduState, eduDispatch] = useEducation()
  const { creator, error, success, message } = eduState

  /** theme & style - states */
  const { inputClasses } = InputStyles()

  /** edu add new - states */
  const [course, setCourse] = useState('')
  const [title, setTitle] = useState('')
  const [entity, setEntity] = useState('')
  const [studyStatus, setStudyStatus] = useState('')

  /** edu add new - function */
  const handleEduAdd = async() => {
    await addEdu(eduDispatch, { course, title, entity, studyStatus, creator })

    setLoading(eduDispatch, false)
    setCourse('')
    setTitle('')
    setEntity('')
    setStudyStatus('')
  }

  return (
    <>
      <Headline headline={isEdit ? 'Edit Existing' : 'Add New'} subHeadline="POST" />
      <form ref={addNewRef} className={inputClasses.form}
        onSubmit={e => {
          e.preventDefault()
          if(isEdit) handleEduUpdate()
          else handleEduAdd()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={eduDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={eduDispatch} message={message} 
                setStatus={setSuccess}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl required variant="outlined" className={inputClasses.formControl}>
                <InputLabel 
                  id="statusStudy"
                  classes={{
                    root: inputClasses.selectFieldLabelRoot,
                    focused: inputClasses.selectFieldLabelFocused,
                    // notchedOutline: classes.selectFieldLabelNotchedOutline,
                  }}
                >
                  Study Status
                </InputLabel>
                <Select
                  labelId="statusStudy"
                  label="Study Status"
                  value={isEdit ? studyStatusChange : studyStatus}
                  onChange={e => isEdit ? setStudyStatusChange(e.target.value) : setStudyStatus(e.target.value)}
                >
                  <MenuItem value="fulltime">Full-time</MenuItem>
                  <MenuItem value="parttime">Part-time</MenuItem>
                  <MenuItem value="postpone">Postpone</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormGroup>
                <TextField 
                  label="Course"
                  variant="outlined"
                  value={isEdit ? courseChange : course}
                  onChange={(e) => isEdit ? setCourseChange(e.target.value) : setCourse(e.target.value)} 
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
                  label="Title"
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
            <Grid item xs={12} md={4}>
              <FormGroup>
                <TextField 
                  label="Entity"
                  variant="outlined"
                  value={isEdit ? entityChange : entity}
                  onChange={(e) => isEdit ? setEntityChange(e.target.value) : setEntity(e.target.value)} 
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
                  setCourseChange('')
                  setTitleChange('')
                  setEntityChange('')
                  setStudyStatusChange('')
                  setEduId('')
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
                  setCourseChange('')
                  setTitleChange('')
                  setEntityChange('')
                  setStudyStatusChange('')
                }
                else {
                  setCourse('')
                  setTitle('')
                  setEntity('')
                  setStudyStatus('')
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

export default AddNewEdu