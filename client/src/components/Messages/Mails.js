import React, { useState, useEffect } from 'react'
import { useMail } from '../../contexts/Mail/Private/MailState'
import { setLoading, setSuccess, setError, getMails, updateMailNoty, updateMailRead, updateMailReply, deleteMail } from '../../contexts/Mail/Private/MailAction'
import AlertMessage from '../global/Alert'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import { Icons2Use, PaginationTableCustom } from '../global/TableMaterial'

const Mails = () => {
  const [mailState, mailDispatch] = useMail()
  const { mails, contact, loading, success, error, message } = mailState
  
  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** global - states */
  const [mailId, setMailId] = useState('')

  /** table icons */
  const { allIcons } = Icons2Use()

  /** mail noty change - states */
  const [mail, setMail] = useState({})
  const [isNoty, setIsNoty] = useState(false)

  /** mail read & reply change - states */
  const [intention, setIntention] = useState('')
  const [isRead, setIsRead] = useState(false)
  const [isReply, setIsReply] = useState(false)

  /** mail delete - states */
  const [currentContact, setCurrentContact] = useState('')
  const [isDelete, setIsDelete] = useState(false)

  /** mail get all - function */
  useEffect(() => {
    (async() => {
      await getMails(mailDispatch)

      setLoading(mailDispatch, false)
    })()
  }, [])

  /** mail noty - function */
  useEffect(() => {
    (async() => {
      if(isNoty) {
        await updateMailNoty(mailDispatch, contact, mailId, mail, intention)

        setLoading(mailDispatch, false)
        setMailId('')
        setIntention('')
        setMail({})
        setIsRead(false)
      }
    })()
  }, [isNoty])

  /** mail read - function */
  useEffect(() => {
    (async() => {
      if(isRead) {
        await updateMailRead(mailDispatch, mailId, intention)

        setLoading(mailDispatch, false)
        setMailId('')
        setIntention('')
        setIsRead(false)
      }
    })()
  }, [isRead])

  /** mail reply - function */
  useEffect(() => {
    (async() => {
      if(isReply) {
        await updateMailReply(mailDispatch, mailId, intention)

        setLoading(mailDispatch, false)
        setMailId('')
        setIntention('')
        setIsReply(false)
      }
    })()
  }, [isReply])

  /** mail delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteMail(mailDispatch, mailId, currentContact)

        setLoading(mailDispatch, false)
        setMailId('')
        setCurrentContact('')
        setIsDelete(false)
      }
    })()
  }, [isDelete])

  return (
    <>
      {loading && <div className="lds-hourglass accents-ver"></div>}
      {error && (
        <AlertMessage
          severity="warning" title="Warning"
          dispatch={mailDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={mailDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <div style={{width: '100%'}}>
        <MaterialTable
          icons={allIcons}
          title="Mails Table"
          data={mails}
          components={{
            Pagination: props => <PaginationTableCustom 
              colSpan={props.colSpan} 
              count={props.count}
              page={props.page}
              onChangePage={props.onChangePage}
              rowsPerPage={props.rowsPerPage}
              onChangeRowsPerPage={props.onChangeRowsPerPage}
            />
          }}
          options={{
            actionsColumnIndex: -1,
            sorting: true,
            headerStyle: {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.common.white
            },
            rowStyle: rowData => ({
              backgroundColor: (rowData.statusNoty === 0 || rowData.statusRead === 0) && (() => theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.lighten.main)()
            })
          }}
          columns={[
            { title: 'From', field: 'fromWho' },
            { title: 'To', field: 'fromTo' },
            { 
              title: 'Concerns', 
              field: 'fromConcerns',
              render: rowData => {
                if(rowData.fromConcerns.split(',')?.length > 0) return (
                  <ul className={classes.ulTable}>
                    {(rowData.fromConcerns.split(',').sort((a, b) => a < b ? -1 : 1)).map(concern => (
                      <li key={concern}>
                        {concern}
                      </li>
                    ))}
                  </ul>
                )
                else return 'N/A'
              },
              sorting: false 
            },
            { title: 'Subject', field: 'fromSubject' },
            { 
              title: 'Message', 
              field: 'fromMessage',
              render: rowData => <p style={{maxHeight: 100, overflow: 'auto'}}>{rowData.fromMessage}</p> 
            },
          ]}
          actions={[
            rowData => ({
              icon: allIcons.Delete,
              tooltip: 'Delete Mail',
              onClick: (event, rowData) => {
                setCurrentContact(contact)
                setMailId(rowData._id)
                setIsDelete(true)
              },
              disabled: rowData.statusRead === 0 || rowData.statusReply === 0
            }),
            rowData => ({
              icon: rowData.statusNoty === 0 ? allIcons.Send : allIcons.Unsend,
              tooltip: rowData.statusNoty === 0 ? 'Send' : 'Resend',
              onClick: (event, rowData) => {
                setMailId(rowData._id)
                setIntention((() => rowData.statusNoty === 0 ? 'send' : 'resend')())
                setMail({
                  fromWho: rowData.fromWho,
                  fromTo: rowData.fromTo,
                  fromConcerns: rowData.fromConcerns,
                  fromSubject: rowData.fromSubject,
                  fromMessage: rowData.fromMessage
                })
                setIsNoty(true)
              }
            }),
            rowData => ({
              icon: rowData.statusRead === 0 ? allIcons.Email : allIcons.MarkReadEmail,
              tooltip: rowData.statusRead === 0 ? 'Read' : 'Unread',
              onClick: (event, rowData) => {
                setMailId(rowData._id)
                setIntention((() => rowData.statusRead === 0 ? 'read' : 'unread')())
                setIsRead(true)
              }
            }),
            rowData => ({
              icon: rowData.statusReply === 0 ? allIcons.Send : allIcons.Unsend,
              tooltip: rowData.statusReply === 0 ? 'Reply' : 'Unreply',
              onClick: (event, rowData) => {
                setMailId(rowData._id)
                setIntention((() => rowData.statusReply === 0 ? 'reply' : 'unreply')())
                setIsReply(true)
              }
            }),
          ]}
        />
      </div>
    </>
  )
}

export default Mails

const useStyles = makeStyles(theme => ({
  ulTable: {
    margin: 0, 
    padding: 0, 
    maxHeight: 100, 
    overflow: 'auto',
    listStyle: 'none',
    '& li:not(:last-child)': {
      marginBottom: 10
    },
  },
}))