import React, { useState, useEffect, useRef } from 'react'
import { useUsers } from '../../contexts/Users/Private/UsersState'
import { setLoading, setSuccess, setError, getUsers, updateUserActive, updateUser, deleteUser } from '../../contexts/Users/Private/UsersAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import AddNew from '../../components/Users/AddNew'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { List, ListItem, ListItemText } from '@material-ui/core'
import MaterialTable from 'material-table'
import { Icons2Use, PaginationTableCustom } from '../../components/global/TableMaterial'

const Users = () => {
  const [usersState, usersDispatch] = useUsers()
  const { users, loading, success, error, message } = usersState

  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** table - icons */
  const { allIcons } = Icons2Use()

  /** global - states */
  const emailRegex = /^.+@[^\.].*\.[a-z]{2,}$/
  const addNewRef = useRef(null)
  const [userId, setUserId] = useState('')

  /** user active status change - states */
  const [intention, setIntention] = useState('')
  const [isActive, setIsActive] = useState(false)

  /** user update - states */
  const [firstNameChange, setFirstNameChange] = useState('')
  const [lastNameChange, setLastNameChange] = useState('')
  const [nickNameChange, setNickNameChange] = useState('')
  const [emailMainChange, setEmailMainChange] = useState('')
  const [emailBackupChange, setEmailBackupChange] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** skill get all - function */
  useEffect(() => {
    (async() => {
      await getUsers(usersDispatch)

      setLoading(usersDispatch, false)
    })()
  }, [])

  /** user active status change - function */
  useEffect(() => {
    (async() => {
      if(isActive) {
        await updateUserActive(usersDispatch, userId, intention)

        setLoading(usersDispatch, false)
        setUserId('')
        setIntention('')
        setIsActive(false)
      }
    })()
  }, [isActive])

  /** user update - function */
  const handleUserUpdate = async() => {
    // throw error if email main taken (other than yourself)
    let otherUsers = users.filter(user => user._id !== userId)
    if(otherUsers.find(user => user.credentials.emails.main === emailMainChange)) return setError(usersDispatch, { status: true, message: 'User already exist!' })
    // throw error if email backup is not form of email (only when its equal to not null)
    if(emailBackupChange !== 'none') {
      if(emailRegex.test(emailBackupChange.trim()) !== true) return setError(usersDispatch, { status: true, message: 'Email backup is not a valid email!' }) 
    }

    await updateUser(usersDispatch, userId, {
      name: {
        firstName: firstNameChange,
        lastName: lastNameChange,
        nickName: nickNameChange
      },
      credentials: {
        emails: {
          main: emailMainChange,
          backup: emailBackupChange
        }
      }
    })

    setLoading(usersDispatch, false)
    setUserId('')
    setFirstNameChange('')
    setLastNameChange('')
    setNickNameChange('')
    setEmailMainChange('')
    setEmailBackupChange('')
    setIsEdit(false)
  }

  /** user delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteUser(usersDispatch, userId)

        setLoading(usersDispatch, false)
        setUserId('')
        setIsDelete(false)
      }
    })()
  }, [isDelete])

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
      <div style={{width: '100%'}}>
        <MaterialTable
          icons={allIcons}
          title="Users Table"
          data={users}
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
              backgroundColor: rowData.status === 1 && (() => theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.lighten.main)()
            })
          }}
          columns={[
            { 
              title: 'Firstname', 
              field: 'name',
              render: rowData => handleNoneValue(rowData.name.firstName),
              customSort: (a, b) => a.name.firstName < b.name.firstName ? -1 : 1
            },
            { 
              title: 'Lastname', 
              field: 'name',
              render: rowData => handleNoneValue(rowData.name.lastName),
              customSort: (a, b) => a.name.lastName < b.name.lastName ? -1 : 1
            },
            { 
              title: 'Nickname', 
              field: 'name',
              render: rowData => handleNoneValue(rowData.name.nickName),
              customSort: (a, b) => a.name.nickName < b.name.nickName ? -1 : 1
            },
            { 
              title: 'Email (main)', 
              field: 'credentials',
              render: rowData => handleNoneValue(rowData.credentials.emails.main),
              customSort: (a, b) => a.credentials.emails.main < b.credentials.emails.main ? -1 : 1
            },
            { 
              title: 'Email (backup)', 
              field: 'credentials',
              render: rowData => handleNoneValue(rowData.credentials.emails.backup),
              customSort: (a, b) => a.credentials.emails.backup < b.credentials.emails.backup ? -1 : 1
            },
            { 
              title: 'Status', 
              field: 'status',
              render: rowData => rowData.status === 0 ? 'Non Active' : 'Active',
              // customSort: (a, b) => a.credentials.emails.backup < b.credentials.emails.backup ? -1 : 1
            },
          ]}
          actions={[
            {
              icon: allIcons.Edit,
              tooltip: 'Edit User',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setFirstNameChange(handleNoneValue(rowData.name.firstName))
                setLastNameChange(handleNoneValue(rowData.name.lastName))
                setNickNameChange(handleNoneValue(rowData.name.nickName))
                setEmailMainChange(handleNoneValue(rowData.credentials.emails.main))
                setEmailBackupChange(handleNoneValue(rowData.credentials.emails.backup))
                setUserId(rowData._id)
                setIsEdit(true)
                addNewRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            },
            rowData => ({
              icon: allIcons.Delete,
              tooltip: rowData.status === 0 ? `Can't Delete` : 'Delete User',
              onClick: (event, rowData) => {
                setUserId(rowData._id)
                setIsDelete(true)
              },
              disabled: rowData.status === 1
            }),
            rowData => ({
              icon: rowData.status === 0 ? allIcons.Publish : allIcons.Unpublish,
              tooltip: rowData.status === 0 ? 'Activate' : 'Deactivate',
              onClick: (event, rowData) => {
                setUserId(rowData._id)
                setIntention((() => rowData.status === 0 ? 'activate' : 'deactivate')())
                setIsActive(true)
              }
            }),
          ]}
        />
      </div>
      <DividerBlank/>
      <AddNew
        isEdit={isEdit} setIsEdit={setIsEdit}
        emailRegex={emailRegex}
        addNewRef={addNewRef}
        handleUserUpdate={handleUserUpdate}
        userId={userId} setUserId={setUserId}
        firstNameChange={firstNameChange} setFirstNameChange={setFirstNameChange}
        lastNameChange={lastNameChange} setLastNameChange={setLastNameChange}
        nickNameChange={nickNameChange} setNickNameChange={setNickNameChange}
        emailMainChange={emailMainChange} setEmailMainChange={setEmailMainChange}
        emailBackupChange={emailBackupChange} setEmailBackupChange={setEmailBackupChange}
      />
    </>
  )
}

export default Users

const useStyles = makeStyles(theme => ({}))