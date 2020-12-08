import React, { useState } from 'react'
import { useResume } from '../../../contexts/User/Private/Resume/ResumeState'
import { setLoading, setError, setSuccess, addResume } from '../../../contexts/User/Private/Resume/ResumeAction'
import { TechnologyState } from '../../../contexts/Technology/TechnologyState'
import AlertMessage from '../../../components/global/Alert'
import Headline from '../../../components/global/Headline'
import { Technologies } from '../../../components/global/Technologies'
import classNames from 'classnames'
import InputStyles from '../../../components/global/InputStyles'
import { useTheme } from '@material-ui/core/styles'
import { 
  Button, 
  Checkbox,
  FormControl,
  FormGroup, 
  Grid, 
  InputLabel,
  MenuItem,
  Select,
  TextField, 
} from '@material-ui/core'

const AddNewResume = ({
  addNewRef,
  isEdit, setIsEdit,
  handleResumeUpdate,
  setResumeId,
  websiteChange, setWebsiteChange,
  descChange, setDescChange,
  techsChange, setTechsChange,
  projsChange, setProjsChange,
}) => {
  const [resumeState, resumeDispatch] = useResume()
  const { projects, creator, error, success, message } = resumeState

  /** theme & style - states */
  const theme = useTheme()
  const { inputClasses } = InputStyles()

  /** resume add new - states */
  const [website, setWebsite] = useState('')
  const [desc, setDesc] = useState('')
  const [techs, setTechs] = useState([])
  const [projs, setProjs] = useState([])

  /** resume add new - function */
  const handleResumeAdd = async() => {
    await addResume(resumeDispatch, { website, desc, techs, projs, creator })

    setLoading(resumeDispatch, false)
    setWebsite('')
    setDesc('')
    setTechs([])
    setProjs([])
  }

  return (
    <>
      <Headline headline={isEdit ? 'Edit Existing' : 'Add New'} subHeadline="RESUME" />
      <form ref={addNewRef} className={inputClasses.form}
        onSubmit={e => {
          e.preventDefault()
          if(isEdit) handleResumeUpdate()
          else handleResumeAdd()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={resumeDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={resumeDispatch} message={message} 
                setStatus={setSuccess}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <TextField 
                label="Website"
                variant="outlined"
                value={isEdit ? websiteChange : website}
                onChange={(e) => isEdit ? setWebsiteChange(e.target.value) : setWebsite(e.target.value)} 
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
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
            <FormGroup>
                <FormControl required variant="outlined" className={inputClasses.formControl}>
                  <InputLabel 
                    id="projsLabel"
                    classes={{
                      root: inputClasses.selectFieldLabelRoot,
                      focused: inputClasses.selectFieldLabelFocused,
                      // notchedOutline: classes.selectFieldLabelNotchedOutline,
                    }}
                  >
                    Projects
                  </InputLabel>
                  <Select
                    labelId="projsLabel"
                    label="Projects"
                    multiple
                    value={isEdit ? projsChange : projs}
                    onChange={e => isEdit ? setProjsChange(e.target.value) : setProjs(e.target.value)}
                    // input={<Input />}
                    renderValue={selected => {
                      let projectsName = []
                      projects.map(project => selected.includes(project._id) && projectsName.push(`${project.name} (${new Date(project.publishedAt).toDateString()})`))
                      return projectsName.join(', ')
                    }}
                    MenuProps={MenuProps}
                  >
                    {projects.map(project => (
                      <MenuItem key={project._id} value={project._id}>
                        <Checkbox checked={isEdit ? projsChange.indexOf(project._id) > -1 : projs.indexOf(project._id) > -1} />
                        {project.name} (<span style={{ color: theme.palette.secondary.main }}>{new Date(project.publishedAt).toDateString()}</span>)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormGroup>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {isEdit && (
              <Button 
                variant="contained" 
                className={classNames(inputClasses.ctaCancel, inputClasses.formBtns)}
                onClick={() => {
                  setWebsiteChange('')
                  setDescChange('')
                  setTechsChange([])
                  setProjsChange([])
                  setResumeId('')
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
                  setWebsiteChange('')
                  setDescChange('')
                  setTechsChange([])
                  setProjsChange([])
                }
                else {
                  setWebsite('')
                  setDesc('')
                  setTechs([])
                  setProjs([])
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

export default AddNewResume

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}