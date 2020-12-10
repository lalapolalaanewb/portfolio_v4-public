import React, { useState, useEffect, useRef } from 'react'
import { useJob } from '../../contexts/User/Private/Job/JobState'
import { setLoading, setSuccess, setError, getJobs, updateJob, updateJobPublish, deleteJob } from '../../contexts/User/Private/Job/JobAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import ReactMarkDown from 'react-markdown'
import Markdown from '../../components/global/Markdown'
import { MarkDownStyles } from '../../components/global/Markdown'
import AddNew from '../../components/Profile/Child/AddNewJob'
import classNames from 'classnames'
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import MaterialTable from 'material-table'
import { Icons2Use, PaginationTableCustom } from '../../components/global/TableMaterial'

const Job = () => {
  const [jobState, jobDispatch] = useJob()
  const { jobs, loading, success, error, message } = jobState
  
  /** theme - states */
  const theme = useTheme()

  /** markdown - states */
  const { markdownStyles } = MarkDownStyles()

  /** global - states */
  const addNewRef = useRef(null)
  const [jobId, setJobId] = useState('')

  /** table icons */
  const { allIcons } = Icons2Use()

  /** job publish change - states */
  const [intention, setIntention] = useState('')
  const [isPublish, setIsPublish] = useState(false)

  /** job update - states */
  const [nameChange, setNameChange] = useState('')
  const [abbreviationChange, setAbbreviationChange] = useState('')
  const [descChange, setDescChange] = useState('')
  const [companyChange, setCompanyChange] = useState('')
  const [currentCreator, setCurrentCreator] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** job get all - function */
  useEffect(() => {
    (async() => {
      await getJobs(jobDispatch)

      setLoading(jobDispatch, false)
    })()
  }, [])

  /** job publish - function */
  useEffect(() => {
    (async() => {
      if(isPublish) {
        await updateJobPublish(jobDispatch, jobId, intention)

        setLoading(jobDispatch, false)
        setJobId('')
        setIntention('')
        setIsPublish(false)
      }
    })()
  }, [isPublish])

  /** job update - function */
  const handleJobUpdate = async() => {
    await updateJob(jobDispatch, jobId, {
      name: nameChange,
      abbreviation: abbreviationChange,
      description: descChange,
      company: companyChange,
    })

    setLoading(jobDispatch, false)
    setNameChange('')
    setAbbreviationChange('')
    setDescChange('')
    setCompanyChange('')
    setJobId('')
    setIsEdit(false)
  }

  /** job delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteJob(jobDispatch, jobId, currentCreator)

        setLoading(jobDispatch, false)
        setJobId('')
        setCurrentCreator('')
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
          dispatch={jobDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={jobDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <div style={{width: '100%'}}>
        <MaterialTable
          icons={allIcons}
          title="Jobs Table"
          data={jobs}
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
                <Typography variant="h5">Description</Typography>
                  {rowData.description !== '' ? <ReactMarkDown source={rowData.description} renderers={{ code: Markdown }}/> : 'none'}
                </div>
              </div>
            )
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
          columns={[
            { title: 'Name', field: 'name' },
            { 
              title: 'Abbreviation', 
              field: 'abbreviation',
              render: rowData => handleNoneValue(rowData.abbreviation) 
            },
            { 
              title: 'Company', 
              field: 'company',
              render: rowData => handleNoneValue(rowData.company) 
            },
          ]}
          actions={[
            {
              icon: allIcons.Edit,
              tooltip: 'Edit Job',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setNameChange(rowData.name)
                setAbbreviationChange(handleNoneValue(rowData.abbreviation))
                setDescChange(handleNoneValue(rowData.description))
                setCompanyChange(handleNoneValue(rowData.company))
                setJobId(rowData._id)
                setIsEdit(true)
                addNewRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            },
            rowData => ({
              icon: allIcons.Delete,
              tooltip: 'Delete Job',
              onClick: (event, rowData) => {
                setCurrentCreator(rowData.creator)
                setJobId(rowData._id)
                setIsDelete(true)
              },
              disabled: rowData.status === 1
            }),
            rowData => ({
              icon: rowData.status === 0 ? allIcons.Publish : allIcons.Unpublish,
              tooltip: rowData.status === 0 ? 'Publish' : 'Unpublish',
              onClick: (event, rowData) => {
                setJobId(rowData._id)
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
        handleJobUpdate={handleJobUpdate}
        setJobId={setJobId}
        nameChange={nameChange} setNameChange={setNameChange}
        abbreviationChange={abbreviationChange} setAbbreviationChange={setAbbreviationChange}
        descChange={descChange} setDescChange={setDescChange}
        companyChange={companyChange} setCompanyChange={setCompanyChange}
      />
    </>
  )
}

export default Job