import React, { useState } from 'react'
import { usePolicy } from '../../../contexts/Policy/Private/PolicyState'
import { setLoading, setError, setSuccess, addPolicy } from '../../../contexts/Policy/Private/PolicyAction'
import { UsersState } from '../../../contexts/Users/Private/UsersState'
import AlertMessage from '../../global/Alert'
import Headline from '../../global/Headline'
import Creators from '../../global/Creators'
import ReactMarkDown from 'react-markdown'
import Markdown from '../../global/Markdown'
import classNames from 'classnames'
import InputStyles from '../../global/InputStyles'
import { useTheme } from '@material-ui/core/styles'
import { 
  Button, 
  FormControl,
  FormGroup, 
  Grid, 
  InputLabel,
  TextField, 
} from '@material-ui/core'

const AddNew = ({
  addNewRef,
  isEdit, setIsEdit,
  handlePolicyUpdate,
  setPolicyId,
  nameChange, setNameChange,
  privacyChange, setPrivacyChange,
  commentChange, setCommentChange,
  creatorChange, setCreatorChange,
}) => {
  const [policyState, policyDispatch] = usePolicy()
  const { error, success, message } = policyState

  /** theme - states */
  const theme = useTheme()

  /** input theme & style - states */
  const { inputClasses } = InputStyles()

  /** policy add new - states */
  const [name, setName] = useState('')
  const [privacy, setPrivacy] = useState('')
  const [comment, setComment] = useState('')

  /** policy add new - function */
  const handlePolicyAdd = async() => {
    await addPolicy(policyDispatch, { name, privacy, comment })

    setLoading(policyDispatch, false)
    setName('')
    setPrivacy('')
    setComment('')
  }

  return (
    <>
      <Headline headline={isEdit ? 'Edit Existing' : 'Add New'} subHeadline="POLICY" />
      <form ref={addNewRef} className={inputClasses.form}
        onSubmit={e => {
          e.preventDefault()
          if(isEdit) handlePolicyUpdate()
          else handlePolicyAdd()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={policyDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={policyDispatch} message={message} 
                setStatus={setSuccess}
              />
            )}
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
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <TextField 
                  label="Privacy"
                  variant="outlined"
                  value={isEdit ? privacyChange : privacy}
                  onChange={(e) => isEdit ? setPrivacyChange(e.target.value) : setPrivacy(e.target.value)} 
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
                source={isEdit ? privacyChange : privacy}
                renderers={{ code: Markdown }}
                // ![alt text](/images/Deku.PNG#thumbnail_fw)
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <TextField 
                  label="Comment"
                  variant="outlined"
                  value={isEdit ? commentChange : comment}
                  onChange={(e) => isEdit ? setCommentChange(e.target.value) : setComment(e.target.value)} 
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
                source={isEdit ? commentChange : comment}
                renderers={{ code: Markdown }}
                // ![alt text](/images/Deku.PNG#thumbnail_fw)
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {isEdit && (
              <Button 
                variant="contained" 
                className={classNames(inputClasses.ctaCancel, inputClasses.formBtns)}
                onClick={() => {
                  setNameChange('')
                  setPrivacyChange('')
                  setCommentChange('')
                  setCreatorChange('')
                  setPolicyId('')
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
                  setPrivacyChange('')
                  setCommentChange('')
                  setCreatorChange('')
                }
                else {
                  setName('')
                  setPrivacy('')
                  setComment('')
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