import React from 'react'
import { useContact } from '../../../contexts/Contact/ContactState'
import { setError, setSuccess } from '../../../contexts/Contact/ContactAction'
import AlertMessage from '../../global/Alert'
import Headline from '../../global/Headline'
import InputStyles from '../../global/InputStyles'
import classNames from 'classnames'
import { 
  Button, 
  FormGroup,
  Grid,
  TextField,
} from '@material-ui/core'

const AddNewSetting = ({
  addNewRef,
  setContactId,
  setIsAdd,
  handleContactAdd,
  senderGmail, setSenderGmail,
  senderEmail, setSenderEmail,
  clientId, setClientId,
  clientSecret, setClientSecret,
  refreshToken, setRefreshToken,
  isEdit, setIsEdit,
  handleContactUpdate,
  senderGmailChange, setSenderGmailChange,
  senderEmailChange, setSenderEmailChange,
  clientIdChange, setClientIdChange,
  clientSecretChange, setClientSecretChange,
  refreshTokenChange, setRefreshTokenChange,
}) => {
  const [contactState, contactDispatch] = useContact()
  const { success, error, message } = contactState

  /** global - states */
  const { inputClasses } = InputStyles()
  return (
    <>
      <Headline headline={isEdit ? 'Edit Existing' : 'Add New'} subHeadline="CONTACT" />
      <form ref={addNewRef} className={inputClasses.form}
        onSubmit={e => {
          e.preventDefault()
          if(isEdit) handleContactUpdate()
          else handleContactAdd()
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <AlertMessage
                severity="warning" title="Warning"
                dispatch={contactDispatch} message={message} 
                setStatus={setError}
              />
            )}
            {success && (
              <AlertMessage
                severity="success" title="Success"
                dispatch={contactDispatch} message={message} 
                setStatus={setSuccess}
              />
            )}
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <TextField 
                  type="email"
                  label="Sender Gmail"
                  variant="outlined"
                  value={isEdit ? senderGmailChange : senderGmail}
                  onChange={(e) => isEdit ? setSenderGmailChange(e.target.value) : setSenderGmail(e.target.value)} 
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
                  type="email" 
                  label="Sender Email"
                  variant="outlined"
                  value={isEdit ? senderEmailChange : senderEmail}
                  onChange={(e) => isEdit ? setSenderEmailChange(e.target.value) : setSenderEmail(e.target.value)} 
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
                  label="Client ID"
                  variant="outlined"
                  value={isEdit ? clientIdChange : clientId}
                  onChange={(e) => isEdit ? setClientIdChange(e.target.value) : setClientId(e.target.value)} 
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
                  label="Client Secret"
                  variant="outlined"
                  value={isEdit ? clientSecretChange : clientSecret}
                  onChange={(e) => isEdit ? setClientSecretChange(e.target.value) : setClientSecret(e.target.value)} 
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
                label="RefreshToken"
                variant="outlined"
                value={isEdit ? refreshTokenChange : refreshToken}
                onChange={(e) => isEdit ? setRefreshTokenChange(e.target.value) : setRefreshToken(e.target.value)} 
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
                if(isEdit) {
                  setSenderGmailChange('')
                  setSenderEmailChange('')
                  setClientIdChange('')
                  setClientSecretChange('')
                  setRefreshTokenChange('')
                  setContactId('')
                  setIsEdit(false) 
                } else {
                  setSenderGmail('')
                  setSenderEmail('')
                  setClientId('')
                  setClientSecret('')
                  setRefreshToken('')
                  setContactId('')
                  setIsAdd(false)
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              className={classNames(inputClasses.ctaReset, inputClasses.formBtns)}
              onClick={e => {
                if(isEdit) {
                  setSenderGmailChange('')
                  setSenderEmailChange('')
                  setClientIdChange('')
                  setClientSecretChange('')
                  setRefreshTokenChange('') 
                } else {
                  setSenderGmail('')
                  setSenderEmail('')
                  setClientId('')
                  setClientSecret('')
                  setRefreshToken('')
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

export default AddNewSetting