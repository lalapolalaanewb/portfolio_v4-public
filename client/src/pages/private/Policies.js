import React, { useState, useEffect, useRef } from 'react'
import { usePolicy } from '../../contexts/Policy/Private/PolicyState'
import { setLoading, setSuccess, setError, getPolicies, updatePolicy, updatePolicyPublish, deletePolicy } from '../../contexts/Policy/Private/PolicyAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import ReactMarkDown from 'react-markdown'
import Markdown from '../../components/global/Markdown'
import { MarkDownStyles } from '../../components/global/Markdown'
import AddNew from '../../components/Policy/Private/AddNew'
import classNames from 'classnames'
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import MaterialTable from 'material-table'
import { Icons2Use, PaginationTableCustom } from '../../components/global/TableMaterial'

const Policies = () => {
  const [policyState, policyDispatch] = usePolicy()
  const { policies, loading, success, error, message } = policyState
  
  /** theme - states */
  const theme = useTheme()

  /** markdown - states */
  const { markdownStyles } = MarkDownStyles()

  /** global - states */
  const addNewRef = useRef(null)
  const [policyId, setPolicyId] = useState('')

  /** table icons */
  const { allIcons } = Icons2Use()

  /** policy publish change - states */
  const [intention, setIntention] = useState('')
  const [isPublish, setIsPublish] = useState(false)

  /** policy update - states */
  const [nameChange, setNameChange] = useState('')
  const [privacyChange, setPrivacyChange] = useState('')
  const [commentChange, setCommentChange] = useState('')
  const [creatorChange, setCreatorChange] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** policy get all - function */
  useEffect(() => {
    (async() => {
      await getPolicies(policyDispatch)

      setLoading(policyDispatch, false)
    })()
  }, [])

  /** policy publish - function */
  useEffect(() => {
    (async() => {
      if(isPublish) {
        await updatePolicyPublish(policyDispatch, policyId, intention)

        setLoading(policyDispatch, false)
        setPolicyId('')
        setIntention('')
        setIsPublish(false)
      }
    })()
  }, [isPublish])

  /** policy update - function */
  const handlePolicyUpdate = async() => {
    await updatePolicy(policyDispatch, policyId, {
      name: nameChange,
      privacy: privacyChange,
      comment: commentChange,
      creator: creatorChange,
    })

    setLoading(policyDispatch, false)
    setNameChange('')
    setPrivacyChange('')
    setCommentChange('')
    setCreatorChange('')
    setPolicyId('')
    setIsEdit(false)
  }

  /** policy delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deletePolicy(policyDispatch, policyId)

        setLoading(policyDispatch, false)
        setPolicyId('')
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
          dispatch={policyDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={policyDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <div style={{width: '100%'}}>
        <MaterialTable
          icons={allIcons}
          title="Policies Table"
          data={policies}
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
              backgroundColor: rowData.status === 0 && (() => theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.lighten.main)()
            })
          }}
          detailPanel={rowData => {
            return (
              <div style={{backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.lighten.light}}>
                <div style={{padding: theme.spacing(3)}} className={theme.palette.type === 'light' ? classNames(markdownStyles.mdContainer, markdownStyles.mdContainerDark) : classNames(markdownStyles.mdContainer, markdownStyles.mdContainerLight)}>
                <Typography variant="h5">Privacy</Typography>
                  {rowData.privacy !== '' ? <ReactMarkDown source={rowData.description} renderers={{ code: Markdown }}/> : 'none'}
                </div>
                <div style={{padding: theme.spacing(3)}} className={theme.palette.type === 'light' ? classNames(markdownStyles.mdContainer, markdownStyles.mdContainerDark) : classNames(markdownStyles.mdContainer, markdownStyles.mdContainerLight)}>
                <Typography variant="h5">Comment</Typography>
                  {rowData.comment !== '' ? <ReactMarkDown source={rowData.description} renderers={{ code: Markdown }}/> : 'none'}
                </div>
              </div>
            )
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
          columns={[
            { 
              title: 'Name', 
              field: 'name',
              render: rowData => handleNoneValue(rowData.name) 
            },
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
              tooltip: 'Edit Policy',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setNameChange(handleNoneValue(rowData.name))
                setPrivacyChange(handleNoneValue(rowData.privacy))
                setCommentChange(handleNoneValue(rowData.comment))
                setCreatorChange(rowData.creator._id)
                setPolicyId(rowData._id)
                setIsEdit(true)
                addNewRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            },
            rowData => ({
              icon: allIcons.Delete,
              tooltip: 'Delete Policy',
              onClick: (event, rowData) => {
                setPolicyId(rowData._id)
                setIsDelete(true)
              },
              disabled: rowData.status === 1
            }),
            rowData => ({
              icon: rowData.status === 0 ? allIcons.Publish : allIcons.Unpublish,
              tooltip: rowData.status === 0 ? 'Publish' : 'Unpublish',
              onClick: (event, rowData) => {
                setPolicyId(rowData._id)
                setIntention((() => rowData.status === 0 ? 'publish' : 'unpublish')())
                setIsPublish(true)
              }
            }),
          ]}
        />
      </div>
      <DividerBlank />
      <AddNew
        addNewRef={addNewRef}
        isEdit={isEdit} setIsEdit={setIsEdit}
        handlePolicyUpdate={handlePolicyUpdate}
        setPolicyId={setPolicyId}
        nameChange={nameChange} setNameChange={setNameChange}
        privacyChange={privacyChange} setPrivacyChange={setPrivacyChange}
        commentChange={commentChange} setCommentChange={setCommentChange}
        creatorChange={creatorChange} setCreatorChange={setCreatorChange}
      />
    </>
  )
}

export default Policies