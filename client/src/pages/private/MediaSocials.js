import React, { useState, useEffect, useRef } from 'react'
import { useMediaSocial } from '../../contexts/MediaSocial/MediaSocialState'
import { setLoading, setSuccess, setError, getMediaSocials, updateMediaSocial, deleteMediaSocial } from '../../contexts/MediaSocial/MediaSocialAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import AddNew from '../../components/MediaSocials/AddNew'
import { useTheme } from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import { Icons2Use, PaginationTableCustom } from '../../components/global/TableMaterial'

const MediaSocials = () => {
  const [mediaSocialState, mediaSocialDispatch] = useMediaSocial()
  const { mediaSocials, loading, success, error, message } = mediaSocialState

  /** theme - states */
  const theme = useTheme()

  /** table - icons */
  const { allIcons } = Icons2Use()

  /** global - states */
  const addNewRef = useRef(null)
  const [mediaSocialId, setMediaSocialId] = useState('')

  /** media social update - states */
  const [nameChange, setNameChange] = useState('')
  const [abbreviationChange, setAbbreviationChange] = useState('')
  const [creatorChange, setCreatorChange] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** media social get all - function */
  useEffect(() => {
    (async() => {
      await getMediaSocials(mediaSocialDispatch)

      setLoading(mediaSocialDispatch, false)
    })()
  }, [])

  /** media social update - function */
  const handleMediaSocialUpdate = async() => {
    await updateMediaSocial(mediaSocialDispatch, mediaSocialId, {
      name: nameChange,
      abbreviation: abbreviationChange,
      creator: creatorChange
    })

    setLoading(mediaSocialDispatch, false)
    setMediaSocialId('')
    setNameChange('')
    setAbbreviationChange('')
    setCreatorChange('')
    setIsEdit(false)
  }

  /** media social delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteMediaSocial(mediaSocialDispatch, mediaSocialId)

        setLoading(mediaSocialDispatch, false)
        setMediaSocialId('')
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
          dispatch={mediaSocialDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={mediaSocialDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <div style={{width: '100%'}}>
      <MaterialTable
          icons={allIcons}
          title="Media Socials Table"
          data={mediaSocials}
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
          }}
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Abbreviation', field: 'abbreviation' },
            { 
              title: 'Creator', 
              field: 'creator',
              render: rowData => rowData.creator.name.firstName,
              customSort: (a, b) => a.creator.name.firstName < b.creator.name.firstName ? -1 : 1
            },
          ]}
          actions={[
            {
              icon: allIcons.Edit,
              tooltip: 'Edit Media Social',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setNameChange(rowData.name)
                setAbbreviationChange(rowData.abbreviation)
                setCreatorChange(rowData.creator._id)
                setMediaSocialId(rowData._id)
                setIsEdit(true)
                addNewRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            },
            {
              icon: allIcons.Delete,
              tooltip: 'Delete Media Social',
              onClick: (event, rowData) => {
                setMediaSocialId(rowData._id)
                setIsDelete(true)
              }
            },
            // {
            //   icon: allIcons.Export,
            //   tooltip: 'Show Skill',
            //   onClick: (event, rowData) => {
            //     console.log(rowData)
            //   }
            // },
          ]}
        />
      </div>
      <DividerBlank/>
      <AddNew
        isEdit={isEdit} setIsEdit={setIsEdit}
        addNewRef={addNewRef}
        handleMediaSocialUpdate={handleMediaSocialUpdate}
        setMediaSocialId={setMediaSocialId}
        nameChange={nameChange} setNameChange={setNameChange} 
        abbreviationChange={abbreviationChange} setAbbreviationChange={setAbbreviationChange}
        creatorChange={creatorChange} setCreatorChange={setCreatorChange}
      />
    </>
  )
}

export default MediaSocials