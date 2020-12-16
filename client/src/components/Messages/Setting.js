import React, { useState, useEffect, useRef } from 'react'
import { useContact } from '../../contexts/Contact/ContactState'
import { setLoading, setError, setSuccess, getContact, addContact, updateContactPublish, updateContact, deleteContact } from '../../contexts/Contact/ContactAction'
import AlertMessage from '../global/Alert'
import { DividerBlank } from '../global/Divider'
import AddNew from './Child/AddNewSetting'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { 
  Button, 
  Card, CardActions, CardContent,
  Typography 
} from '@material-ui/core'

const Setting = () => {
  const [contactState, contactDispatch] = useContact()
  const { contact, loading, success, error, message } = contactState

  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** global - states */
  const addNewRef = useRef(null)
  const [contactId, setContactId] = useState('')

  /** contact add - states */
  const [senderGmail, setSenderGmail] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [isAdd, setIsAdd] = useState(false)

  /** contact publish change - states */
  const [intention, setIntention] = useState('')
  const [isPublish, setIsPublish] = useState(false)

  /** contact update - states */
  const [senderGmailChange, setSenderGmailChange] = useState('')
  const [senderEmailChange, setSenderEmailChange] = useState('')
  const [clientIdChange, setClientIdChange] = useState('')
  const [clientSecretChange, setClientSecretChange] = useState('')
  const [refreshTokenChange, setRefreshTokenChange] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** contact get - function */
  useEffect(() => {
    (async() => {
      await getContact(contactDispatch)

      setLoading(contactDispatch, false)
    })()
  }, [])

  /** contact add - function */
  const handleContactAdd = async() => {
    await addContact(contactDispatch, {
      senderGmail: senderGmail,
      senderEmail: senderEmail,
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken
    })

    setLoading(contactDispatch, false)
    setContactId('')
    setSenderGmail('')
    setSenderEmail('')
    setClientId('')
    setClientSecret('')
    setRefreshToken('')
    setIsAdd(false)
  }

  /** contact publish - function */
  useEffect(() => {
    (async() => {
      if(isPublish) {
        await updateContactPublish(contactDispatch, contactId, intention)

        setLoading(contactDispatch, false)
        setContactId('')
        setIntention('')
        setIsPublish(false)
      }
    })()
  }, [isPublish])

  /** contact update - function */
  const handleContactUpdate = async() => {
    await updateContact(contactDispatch, contactId, {
      senderGmail: senderGmailChange,
      senderEmail: senderEmailChange,
      clientId: clientIdChange,
      clientSecret: clientSecretChange,
      refreshToken: refreshTokenChange
    })

    setLoading(contactDispatch, false)
    setContactId('')
    setSenderGmailChange('')
    setSenderEmailChange('')
    setClientIdChange('')
    setClientSecretChange('')
    setRefreshTokenChange('')
    setIsEdit(false)
  }

  /** contact delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteContact(contactDispatch, contactId)

        setLoading(contactDispatch, false)
        setContactId('')
        setIsDelete(false)
      }
    })()
  }, [isDelete])

  // handle 'none' value
  const handleNoneValue = value => {
    let finalValue

    value !== '' ? finalValue = value : finalValue = 'N/A'

    return finalValue
  }

  return (
    <>
      {loading && <div className="lds-hourglass accents-ver"></div>}
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
      <div>
        <Card style={{ backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.lighten.light }}>
          <CardContent>
            <Typography variant="body2" component="p" className={classes.textCut}>
              Sender Gmail : {handleNoneValue(contact.senderGmail)}
              <br />
              Sender Email : {handleNoneValue(contact.senderEmail)}
            </Typography>
            <Typography variant="body2" component="p" className={classes.textCut}>
              client ID : {handleNoneValue(contact.clientId)}
              <br />
              Client Secret : {handleNoneValue(contact.clientSecret)}
              <br />
              Refresh Token : {handleNoneValue(contact.refreshToken)}
            </Typography>
          </CardContent>
          <CardActions>
            {contact.senderGmail !== '' ? (
              <>
                <Button size="small" onClick={() => {
                  setSenderGmailChange(contact.senderGmail)
                  setSenderEmailChange(contact.senderEmail)
                  setClientIdChange(contact.clientId)
                  setClientSecretChange(contact.clientSecret)
                  setRefreshTokenChange(contact.refreshToken)
                  setContactId(contact._id)
                  setIsEdit(true)
                  setTimeout(() => addNewRef.current.scrollIntoView({ behavior: 'smooth' }), 500)
                }}
                >
                  Edit
                </Button>
                <Button size="small" onClick={() => {
                  setContactId(contact._id)
                  setIsDelete(true)
                }}
                >
                  Delete
                </Button>
                <Button size="small" onClick={() => {
                  setContactId(contact._id)
                  setIntention((() => contact.status === 0 ? 'publish' : 'unpublish')())
                  setIsPublish(true)
                }}
                >
                  {contact.status === 0 ? 'Publish' : 'Unpublish'}
                </Button>
              </>
            ): (
              <Button size="small" onClick={() => {
                setIsAdd(true)
                setTimeout(() => addNewRef.current.scrollIntoView({ behavior: 'smooth' }), 500)
              }}
              >
                Add
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
      {(isAdd || isEdit) && (
        <>
          <DividerBlank/>
          <AddNew
            addNewRef={addNewRef}
            contatId={contactId} setContactId={setContactId}
            setIsAdd={setIsAdd}
            handleContactAdd={handleContactAdd}
            senderGmail={senderGmail} setSenderGmail={setSenderGmail}
            senderEmail={senderEmail} setSenderEmail={setSenderEmail}
            clientId={clientId} setClientId={setClientId}
            clientSecret={clientSecret} setClientSecret={setClientSecret}
            refreshToken={refreshToken} setRefreshToken={setRefreshToken}
            isEdit={isEdit} setIsEdit={setIsEdit}
            handleContactUpdate={handleContactUpdate}
            senderGmailChange={senderGmailChange} setSenderGmailChange={setSenderGmailChange}
            senderEmailChange={senderEmailChange} setSenderEmailChange={setSenderEmailChange}
            clientIdChange={clientIdChange} setClientIdChange={setClientIdChange}
            clientSecretChange={clientSecretChange} setClientSecretChange={setClientSecretChange}
            refreshTokenChange={refreshTokenChange} setRefreshTokenChange={setRefreshTokenChange}
          />
        </>
      )}
    </>
  )
}

export default Setting

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