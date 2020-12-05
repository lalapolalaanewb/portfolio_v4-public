import React, { useEffect } from 'react'
import { useMediaSocial } from '../../../../contexts/MediaSocial/MediaSocialState'
import { setLoading, setError, getMediaSocials } from '../../../../contexts/MediaSocial/MediaSocialAction'
import AlertMessage from '../../../global/Alert'
import { MenuItem, Select } from '@material-ui/core'

const MediaSocials = ({
  isEdit,
  icon, setIcon, 
  iconChange, setIconChange
}) => {
  const [mediaSocialState, mediaSocialDispatch] = useMediaSocial()
  const { loading, error, message, mediaSocials } = mediaSocialState

  // get users
  useEffect(() => {
    (async() => {
      await getMediaSocials(mediaSocialDispatch)

      setLoading(mediaSocialDispatch, false)
    })()
  }, [])

  return (
    <>
      {loading && <div className="lds-hourglass accents-ver"></div>}
      {error && (
        <AlertMessage
          severity="warning" title="Warning"
          dispatch={mediaSocialDispatch} message={message} 
          setStatus={setError}
        />
      )}
      <Select
        labelId="iconLabel"
        label="Icon"
        value={isEdit ? iconChange : icon}
        onChange={e => isEdit ? setIconChange(e.target.value) : setIcon(e.target.value)}
      >
        {mediaSocials.map(mediaSocial => <MenuItem key={mediaSocial._id} value={mediaSocial._id}>{mediaSocial.name}</MenuItem>)}
      </Select>
    </>
  )
}

export default MediaSocials