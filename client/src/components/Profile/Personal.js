import React, { useState, useEffect, useRef } from 'react'
import { usePersonal } from '../../contexts/User/Private/Personal/PersonalState'
import { setLoading, setError, setSuccess, getUser, updateUserPersonal, updateUserPersonalPassword } from '../../contexts/User/Private/Personal/PersonalAction'
import AlertMessage from '../global/Alert'
import { DividerBlank } from '../global/Divider'
import Headline from '../global/Headline'
import InputStyles from '../global/InputStyles'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { 
  Button, 
  Card, CardActions, CardContent,
  FormGroup,
  Grid,
  TextField, Typography 
} from '@material-ui/core'

const Personal = () => {
  const [personalState, personalDispatch] = usePersonal()
  const { user, loading, success, error, message } = personalState

  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** global - states */
  const emailRegex = /^.+@[^\.].*\.[a-z]{2,}$/
  const addNewRef = useRef(null)
  const { inputClasses } = InputStyles()
  const [userId, setUserId] = useState('')

  /** user update - states */
  const [firstNameChange, setFirstNameChange] = useState('')
  const [lastNameChange, setLastNameChange] = useState('')
  const [nickNameChange, setNickNameChange] = useState('')
  const [emailBackupChange, setEmailBackupChange] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  /** user change password - states */
  const [passwordChange, setPasswordChange] = useState('')
  const [passwordConfirmChange, setPasswordConfirmChange] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [isChangePassword, setIsChangePassword] = useState(false)

  /** user get - function */
  useEffect(() => {
    (async() => {
      await getUser(personalDispatch)

      setLoading(personalDispatch, false)
    })()
  }, [])

  /** user update - function */
  const handleUserUpdate = async() => {
    // throw error if email backup is not form of email (only when its equal to not null)
    if(emailBackupChange !== 'none') {
      if(emailRegex.test(emailBackupChange.trim()) !== true) return setError(personalDispatch, { status: true, message: 'Email backup is not a valid email!' }) 
    }

    await updateUserPersonal(personalDispatch, userId, {
      name: {
        firstName: firstNameChange,
        lastName: lastNameChange,
        nickName: nickNameChange
      },
      emails: {
        backup: emailBackupChange
      }
    })

    setLoading(personalDispatch, false)
    setUserId('')
    setFirstNameChange('')
    setLastNameChange('')
    setNickNameChange('')
    setEmailBackupChange('')
    setIsEdit(false)
  }

  /** user password change - function */
  const handleUserPasswordChange = async() => {
    // throw error if password not match
    if(passwordChange !== passwordConfirmChange) return setError(personalDispatch, { status: true, message: 'Password does not match!' })

    await updateUserPersonalPassword(personalDispatch, userId, {
      new: {
        password: passwordChange,
        passwordConfirm: passwordConfirmChange
      },
      current: currentPassword
    })

    setLoading(personalDispatch, false)
    setUserId('')
    setPasswordChange('')
    setPasswordConfirmChange('')
    setCurrentPassword('')
    setIsChangePassword(false)
  }

  // handle 'none' value
  const handleNoneValue = value => {
    let finalValue

    value !== '' ? finalValue = value : finalValue = 'none'

    return finalValue
  }
  
  return (
    <>
      {loading && <div className="lds-hourglass accents-ver"></div>}
      {error && (
        <AlertMessage
          severity="warning" title="Warning"
          dispatch={personalDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={personalDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <div>
        <Card style={{ backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.lighten.light }}>
          <CardContent>
            <Typography className={classes.nickName} color="textSecondary" gutterBottom>
              {handleNoneValue(user.name.nickName)}
            </Typography>
            <Typography variant="h5" component="h2">
              {handleNoneValue(user.name.firstName)}
            </Typography>
            <Typography className={classes.lastName} color="textSecondary">
              {handleNoneValue(user.name.lastName)}
            </Typography>
            <Typography variant="body2" component="p" className={classes.textCut}>
              Email (main) : {handleNoneValue(user.credentials.emails.main)}
              <br />
              Email (backup) : {handleNoneValue(user.credentials.emails.backup)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => {
              setFirstNameChange(handleNoneValue(user.name.firstName))
              setLastNameChange(handleNoneValue(user.name.lastName))
              setNickNameChange(handleNoneValue(user.name.nickName))
              setEmailBackupChange(handleNoneValue(user.credentials.emails.backup))
              setUserId(user._id)
              setIsEdit(true)
              setTimeout(() => addNewRef.current.scrollIntoView({ behavior: 'smooth' }), 500)
            }}
            >
              Edit
            </Button>
            <Button size="small" onClick={() => {
              setUserId(user._id)
              setIsChangePassword(true)
              setTimeout(() => addNewRef.current.scrollIntoView({ behavior: 'smooth' }), 500)
            }}
            >
              Change Password
            </Button>
          </CardActions>
        </Card>
      </div>
      {isEdit && (
        <>
          <DividerBlank/>
          <Headline headline="Add New" subHeadline="USER" />
          <form ref={addNewRef} className={inputClasses.form}
            onSubmit={e => {
              e.preventDefault()
              handleUserUpdate()
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {error && (
                  <AlertMessage
                    severity="warning" title="Warning"
                    dispatch={personalDispatch} message={message} 
                    setStatus={setError}
                  />
                )}
                {success && (
                  <AlertMessage
                    severity="success" title="Success"
                    dispatch={personalDispatch} message={message} 
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
                      value={firstNameChange}
                      onChange={(e) => setFirstNameChange(e.target.value)} 
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
                      value={lastNameChange}
                      onChange={(e) => setLastNameChange(e.target.value)} 
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
                      value={nickNameChange}
                      onChange={(e) => setNickNameChange(e.target.value)} 
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
                    // error={emailRegex.test(emailMain.trim()) ? '' : 'Invalid email!'}
                    // helperText={emailRegex.test(emailMain.trim()) ? '' : 'Invalid email!'}
                    // type="email"
                    label="Email (backup)"
                    variant="outlined"
                    value={emailBackupChange}
                    onChange={(e) => setEmailBackupChange(e.target.value)} 
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
                <Button 
                  variant="contained" 
                  className={classNames(inputClasses.ctaCancel, inputClasses.formBtns)}
                  onClick={() => {
                    setFirstNameChange('')
                    setLastNameChange('')
                    setNickNameChange('')
                    setEmailBackupChange('')
                    setUserId('')
                    setIsEdit(false)
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  className={classNames(inputClasses.ctaReset, inputClasses.formBtns)}
                  onClick={e => {
                    e.preventDefault()
                    setFirstNameChange('')
                    setLastNameChange('')
                    setNickNameChange('')
                    setEmailBackupChange('')
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
      )}
      {isChangePassword && (
        <>
          <DividerBlank/>
          <Headline headline="Add New" subHeadline="USER" />
          <form ref={addNewRef} className={inputClasses.form}
            onSubmit={e => {
              e.preventDefault()
              handleUserPasswordChange()
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {error && (
                  <AlertMessage
                    severity="warning" title="Warning"
                    dispatch={personalDispatch} message={message} 
                    setStatus={setError}
                  />
                )}
                {success && (
                  <AlertMessage
                    severity="success" title="Success"
                    dispatch={personalDispatch} message={message} 
                    setStatus={setSuccess}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <FormGroup>
                  <TextField 
                    type="password"
                    label="Current Password"
                    variant="outlined"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)} 
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
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <TextField 
                      type="password"
                      label="Password"
                      variant="outlined"
                      value={passwordChange}
                      onChange={(e) => setPasswordChange(e.target.value)} 
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
                      error={passwordChange !== passwordConfirmChange ? 'true' : ''}
                      helperText={passwordChange !== passwordConfirmChange ? 'Password not match!' : ''}
                      type="password"
                      label="Password (confirm)"
                      variant="outlined"
                      value={passwordConfirmChange}
                      onChange={(e) => setPasswordConfirmChange(e.target.value)} 
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
                <Button 
                  variant="contained" 
                  className={classNames(inputClasses.ctaCancel, inputClasses.formBtns)}
                  onClick={() => {
                    setPasswordChange('')
                    setPasswordConfirmChange('')
                    setCurrentPassword('')
                    setUserId('')
                    setIsChangePassword(false)
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  className={classNames(inputClasses.ctaReset, inputClasses.formBtns)}
                  onClick={e => {
                    e.preventDefault()
                    setPasswordChange('')
                    setPasswordConfirmChange('')
                    setCurrentPassword('')
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
      )}
    </>
  )
}

export default Personal

const useStyles = makeStyles(theme => ({
  textCut: {
    maxWidth: '100%',
    overflow: 'auto',
  },
  nickName: {
    fontSize: 14,
  },
  lastName: {
    marginBottom: 12,
  },
}))