import React, { useState, useEffect } from 'react'
import { useUsers } from '../../contexts/Users/Private/UsersState'
import { setLoading, setSuccess, setError, addUser } from '../../contexts/Users/Private/UsersAction'
import AlertMessage from '../global/Alert'
import Headline from '../global/Headline'
import classNames from 'classnames'
import InputStyles from '../global/InputStyles'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { 
  Button,  
  FormGroup, 
  Grid, 
  TextField, 
} from '@material-ui/core'

const AddNew = ({
  isEdit, setIsEdit,
  emailRegex,
  addNewRef,
  handleUserUpdate,
  userId, setUserId,
  firstNameChange, setFirstNameChange,
  lastNameChange, setLastNameChange,
  nickNameChange, setNickNameChange,
  emailMainChange, setEmailMainChange,
  emailBackupChange, setEmailBackupChange
}) => {
  const [usersState, usersDispatch] = useUsers()
  const { users, success, error, message } = usersState
  
  /** theme & style - states */
  const classes = useStyles()
  const theme = useTheme()
  const { inputClasses } = InputStyles()

  /** user add - states */
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [nickName, setNickName] = useState('')
  const [emailMain, setEmailMain] = useState('')
  const [emailBackup, setEmailBackup] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  /** user add - function */
  const handleUserAdd = async() => {
    // throw error if email main taken
    if(users.find(user => user.credentials.emails.main === emailMain)) return setError(usersDispatch, { status: true, message: 'User already exist!' })
    // throw error if email backup is not form of email (only when its equal to not null)
    if(emailBackup !== 'none') {
      console.log('backup bkn none')
      if(emailRegex.test(emailBackup.trim()) !== true) {
        console.log('email regex false')
        return setError(usersDispatch, { status: true, message: 'Email backup is not a valid email!' })
      } 
    }
    // throw error if password not match
    if(password !== passwordConfirm) return setError(usersDispatch, { status: true, message: 'Password does not match!' })

    await addUser(usersDispatch, {
      name: { firstName, lastName, nickName },
      credentials: {
        emails: {
          main: emailMain,
          backup: emailBackup
        },
        password: password,
        passwordConfirm: passwordConfirm
      }
    })

    setLoading(usersDispatch, false)
    setFirstName('')
    setLastName('')
    setNickName('')
    setEmailMain('')
    setEmailBackup('')
    setPassword('')
    setPasswordConfirm('')
  }

  // handle checking user exist
  const handleUserExist = userEmail => {
    let otherUsers = []

    if(isEdit) otherUsers = users.filter(user => user._id !== userId)
    else otherUsers = users

    return otherUsers.find(user => user.credentials.emails.main === userEmail) ? 'User already exist!' : ''
  }

  return (
    <>
      <Headline headline={isEdit ? 'Edit Existing' : 'Add New'} subHeadline="USER" />
      <form ref={addNewRef} className={inputClasses.form}
        onSubmit={e => {
          e.preventDefault()
          if(isEdit) handleUserUpdate()
          else handleUserAdd()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={usersDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={usersDispatch} message={message} 
                setStatus={setSuccess}
              />
            )}
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormGroup>
                <TextField 
                  label="Firstname"
                  variant="outlined"
                  value={isEdit ? firstNameChange : firstName}
                  onChange={(e) => isEdit ? setFirstNameChange(e.target.value) : setFirstName(e.target.value)} 
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
            <Grid item xs={12} sm={4}>
              <FormGroup>
                <TextField 
                  label="Lastname"
                  variant="outlined"
                  value={isEdit ? lastNameChange : lastName}
                  onChange={(e) => isEdit ? setLastNameChange(e.target.value) : setLastName(e.target.value)} 
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
            <Grid item xs={12} sm={4}>
              <FormGroup>
                <TextField 
                  label="Nickname"
                  variant="outlined"
                  value={isEdit ? nickNameChange : nickName}
                  onChange={(e) => isEdit ? setNickNameChange(e.target.value) : setNickName(e.target.value)} 
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
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <TextField 
                  error={handleUserExist(isEdit ? emailMainChange : emailMain)}
                  helperText={handleUserExist(isEdit ? emailMainChange : emailMain)}
                  type="email"
                  label="Email (main)"
                  variant="outlined"
                  value={isEdit ? emailMainChange : emailMain}
                  onChange={(e) => isEdit ? setEmailMainChange(e.target.value) : setEmailMain(e.target.value)} 
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
                  // error={emailRegex.test(emailMain.trim()) ? '' : 'Invalid email!'}
                  // helperText={emailRegex.test(emailMain.trim()) ? '' : 'Invalid email!'}
                  // type="email"
                  label="Email (backup)"
                  variant="outlined"
                  value={isEdit ? emailBackupChange : emailBackup}
                  onChange={(e) => isEdit ? setEmailBackupChange(e.target.value) : setEmailBackup(e.target.value)} 
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
          {!isEdit && (
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <TextField 
                    type="password"
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
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
                    error={password !== passwordConfirm ? 'true' : ''}
                    helperText={password !== passwordConfirm ? 'Password not match!' : ''}
                    type="password"
                    label="Password (confirm)"
                    variant="outlined"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)} 
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
          )}
          <Grid item xs={12}>
            {isEdit && (
              <Button 
                variant="contained" 
                className={classNames(inputClasses.ctaCancel, inputClasses.formBtns)}
                onClick={() => {
                  setFirstNameChange('')
                  setLastNameChange('')
                  setNickNameChange('')
                  setEmailMainChange('')
                  setEmailBackupChange('')
                  setUserId('')
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
                  setFirstNameChange('')
                  setLastNameChange('')
                  setNickNameChange('')
                  setEmailMainChange('')
                  setEmailBackupChange('')
                }
                else {
                  setFirstName('')
                  setLastName('')
                  setNickName('')
                  setEmailMain('')
                  setEmailBackup('')
                  setPassword('')
                  setPasswordConfirm('')
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

const useStyles = makeStyles(theme => ({}))