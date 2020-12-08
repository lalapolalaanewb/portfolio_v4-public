import React, { useState, useEffect, useRef } from 'react'
import { useResume } from '../../contexts/User/Private/Resume/ResumeState'
import { setLoading, setSuccess, setError, getResumes, updateResume, updateResumePublish, deleteResume } from '../../contexts/User/Private/Resume/ResumeAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import AddNew from '../../components/Profile/Child/AddNewResume'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import { Icons2Use, PaginationTableCustom } from '../../components/global/TableMaterial'

const Resume = () => {
  const [resumeState, resumeDispatch] = useResume()
  const { resumes, loading, success, error, message } = resumeState
  
  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** global - states */
  const addNewRef = useRef(null)
  const [resumeId, setResumeId] = useState('')

  /** table icons */
  const { allIcons } = Icons2Use()

  /** resume publish change - states */
  const [intention, setIntention] = useState('')
  const [isPublish, setIsPublish] = useState(false)

  /** resume update - states */
  const [websiteChange, setWebsiteChange] = useState('')
  const [descChange, setDescChange] = useState('')
  const [techsChange, setTechsChange] = useState([])
  const [projsChange, setProjsChange] = useState([])
  const [currentCreator, setCurrentCreator] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** resume get all - function */
  useEffect(() => {
    (async() => {
      await getResumes(resumeDispatch)

      setLoading(resumeDispatch, false)
    })()
  }, [])

  /** resume publish - function */
  useEffect(() => {
    (async() => {
      if(isPublish) {
        await updateResumePublish(resumeDispatch, resumeId, intention)

        setLoading(resumeDispatch, false)
        setResumeId('')
        setIntention('')
        setIsPublish(false)
      }
    })()
  }, [isPublish])

  /** resume update - function */
  const handleResumeUpdate = async() => {
    await updateResume(resumeDispatch, resumeId, {
      website: websiteChange,
      description: descChange,
      techs: techsChange,
      projects: projsChange,
    })

    setLoading(resumeDispatch, false)
    setWebsiteChange('')
    setDescChange('')
    setTechsChange([])
    setProjsChange([])
    setResumeId('')
    setIsEdit(false)
  }

  /** resume delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteResume(resumeDispatch, resumeId, currentCreator)

        setLoading(resumeDispatch, false)
        setResumeId('')
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
          dispatch={resumeDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={resumeDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <div style={{width: '100%'}}>
        <MaterialTable
          icons={allIcons}
          title="Resumes Table"
          data={resumes}
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
          columns={[
            { 
              title: 'Website', 
              field: 'website',
              render: rowData => handleNoneValue(rowData.contactInfo.website) 
            },
            { 
              title: 'Description', 
              field: 'description',
              render: rowData => handleNoneValue(rowData.description) 
            },
            { 
              title: 'Techs', 
              field: 'techs',
              render: rowData => {
                return (
                  <ul className={classes.ulTable}>
                    {rowData.techs?.length > 0 && (rowData.techs.sort((a, b) => a.name < b.name ? -1 : 1)).map(tech => (
                      <li key={tech._id}>
                        {tech.name}
                      </li>
                    ))}
                  </ul>
                )
              },
              sorting: false 
            },
            { 
              title: 'Projects', 
              field: 'projects',
              render: rowData => {
                return (
                  <ul className={classes.ulTable}>
                    {rowData.projects?.length > 0 && (rowData.projects.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))).map(project => (
                      <li key={project._id}>
                        {project.name} (<span style={{ color: theme.palette.secondary.main }}>{new Date(project.publishedAt).toDateString()}</span>)
                      </li>
                    ))}
                  </ul>
                )
              },
              sorting: false 
            },
          ]}
          actions={[
            {
              icon: allIcons.Edit,
              tooltip: 'Edit Resume',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setWebsiteChange(handleNoneValue(rowData.contactInfo.website))
                setDescChange(handleNoneValue(rowData.description))
                setTechsChange(() => {
                  let techs = []
                  rowData.techs.forEach(tech => techs.push(tech.name))
                  return techs
                })
                setProjsChange(() => {
                  let projects = []
                  rowData.projects.forEach(project => projects.push(project._id))
                  return projects
                })
                setResumeId(rowData._id)
                setIsEdit(true)
                addNewRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            },
            rowData => ({
              icon: allIcons.Delete,
              tooltip: 'Delete Resume',
              onClick: (event, rowData) => {
                setCurrentCreator(rowData.creator)
                setResumeId(rowData._id)
                setIsDelete(true)
              },
              disabled: rowData.status === 1
            }),
            rowData => ({
              icon: rowData.status === 0 ? allIcons.Publish : allIcons.Unpublish,
              tooltip: rowData.status === 0 ? 'Publish' : 'Unpublish',
              onClick: (event, rowData) => {
                setResumeId(rowData._id)
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
        handleResumeUpdate={handleResumeUpdate}
        setResumeId={setResumeId}
        websiteChange={websiteChange} setWebsiteChange={setWebsiteChange}
        descChange={descChange} setDescChange={setDescChange}
        techsChange={techsChange} setTechsChange={setTechsChange}
        projsChange={projsChange} setProjsChange={setProjsChange}
      />
    </>
  )
}

export default Resume

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
  }
}))