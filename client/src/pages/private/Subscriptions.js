import React, { useState, useEffect } from 'react'
import { useSubscription } from '../../contexts/Subscription/Private/SubscriptionState'
import { setLoading, setSuccess, setError, getSubs, updateSubNoty, updateSubRead, updateSubReply, deleteSub } from '../../contexts/Subscription/Private/SubscriptionAction'
import AlertMessage from '../../components/global/Alert'
import { useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import { Icons2Use, PaginationTableCustom } from '../../components/global/TableMaterial'

const Subscriptions = () => {
  const [subState, subDispatch] = useSubscription()
  const { subs, loading, success, error, message } = subState
  
  /** theme - states */
  const theme = useTheme()

  /** global - states */
  const [subId, setSubId] = useState('')

  /** table icons */
  const { allIcons } = Icons2Use()

  /** sub mail noty change - states */
  const [mail, setMail] = useState({})
  const [isNoty, setIsNoty] = useState(false)

  /** sub mail read & reply change - states */
  const [intention, setIntention] = useState('')
  const [isRead, setIsRead] = useState(false)
  const [isReply, setIsReply] = useState(false)

  /** sub mail delete - states */
  const [isDelete, setIsDelete] = useState(false)

  /** sub mail get all - function */
  useEffect(() => {
    (async() => {
      await getSubs(subDispatch)
    
      setLoading(subDispatch, false)
    })()
  }, [])

  /** sub mail noty - function */
  useEffect(() => {
    (async() => {
      if(isNoty) {
        await updateSubNoty(subDispatch, subId, mail, intention)

        setLoading(subDispatch, false)
        setSubId('')
        setIntention('')
        setMail({})
        setIsRead(false)
      }
    })()
  }, [isNoty])

  /** sub mail read - function */
  useEffect(() => {
    (async() => {
      if(isRead) {
        await updateSubRead(subDispatch, subId, intention)

        setLoading(subDispatch, false)
        setSubId('')
        setIntention('')
        setIsRead(false)
      }
    })()
  }, [isRead])

  /** sub mail reply - function */
  useEffect(() => {
    (async() => {
      if(isReply) {
        await updateSubReply(subDispatch, subId, intention)

        setLoading(subDispatch, false)
        setSubId('')
        setIntention('')
        setIsReply(false)
      }
    })()
  }, [isReply])

  /** sub mail delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteSub(subDispatch, subId)

        setLoading(subDispatch, false)
        setSubId('')
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
          dispatch={subDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={subDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <div style={{width: '100%'}}>
        <MaterialTable
          icons={allIcons}
          title="Newsletter Subs Table"
          data={subs}
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
            { 
              title: 'To', 
              field: 'subsTo',
              render: rowData => rowData.subsTo.name.firstName,
              customSort: (a, b) => a.subsTo.name.firstName < b.subsTo.name.firstName ? -1 : 1
            },
            { 
              title: 'Sent At', 
              field: 'createdAt',
              render: rowData => new Date(rowData.createdAt).toDateString(),
              customSort: (a, b) => new Date(b.createdAt).toDateString() - new Date(a.createdAt).toDateString()
            },
            { 
              title: 'Updated At', 
              field: 'updatedAt',
              render: rowData => new Date(rowData.updatedAt).toDateString(),
              customSort: (a, b) => new Date(b.updatedAt).toDateString() - new Date(a.updatedAt).toDateString()
            },
          ]}
          actions={[
            rowData => ({
              icon: allIcons.Delete,
              tooltip: 'Delete Sub',
              onClick: (event, rowData) => {
                setSubId(rowData._id)
                setIsDelete(true)
              },
              disabled: rowData.statusRead === 0 || rowData.statusReply === 0
            }),
            rowData => ({
              icon: rowData.statusNoty === 0 ? allIcons.Send : allIcons.Unsend,
              tooltip: rowData.statusNoty === 0 ? 'Send' : 'Resend',
              onClick: (event, rowData) => {
                setSubId(rowData._id)
                setIntention((() => rowData.statusNoty === 0 ? 'send' : 'resend')())
                setMail({
                  fromWho: rowData.fromWho,
                })
                setIsNoty(true)
              }
            }),
            rowData => ({
              icon: rowData.statusRead === 0 ? allIcons.Email : allIcons.MarkReadEmail,
              tooltip: rowData.statusRead === 0 ? 'Read' : 'Unread',
              onClick: (event, rowData) => {
                setSubId(rowData._id)
                setIntention((() => rowData.statusRead === 0 ? 'read' : 'unread')())
                setIsRead(true)
              }
            }),
            rowData => ({
              icon: rowData.statusReply === 0 ? allIcons.Send : allIcons.Unsend,
              tooltip: rowData.statusReply === 0 ? 'Reply' : 'Unreply',
              onClick: (event, rowData) => {
                setSubId(rowData._id)
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

export default Subscriptions