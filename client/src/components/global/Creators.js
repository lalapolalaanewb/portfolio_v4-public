import React, { useEffect } from 'react'
import { useUsers } from '../../contexts/Users/Private/UsersState'
import { setLoading, setError, getUsers } from '../../contexts/Users/Private/UsersAction'
import AlertMessage from './Alert'
import { MenuItem, Select } from '@material-ui/core'

const Creators = ({
  creatorChange, setCreatorChange
}) => {
  const [usersState, userDispatch] = useUsers()
  const { loading, error, message, users } = usersState

  // get users
  useEffect(() => {
    (async() => {
      await getUsers(userDispatch)

      setLoading(userDispatch, false)
    })()
  }, [])

  return (
    <>
      {loading && <div className="lds-hourglass accents-ver"></div>}
      {error && (
        <AlertMessage
          severity="warning" title="Warning"
          dispatch={userDispatch} message={message} 
          setStatus={setError}
        />
      )}
      <Select
        labelId="creatorsLabel"
        label="Creator"
        value={creatorChange}
        onChange={e => setCreatorChange(e.target.value)}
      >
        {users.map(user => <MenuItem key={user._id} value={user._id}>{user.name.firstName}</MenuItem>)}
      </Select>
    </>
  )
}

export default Creators