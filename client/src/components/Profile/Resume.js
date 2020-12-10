import React, { useState, useEffect, useRef } from 'react'
import { useResume } from '../../contexts/User/Private/Resume/ResumeState'
import { setLoading, setSuccess, setError, getResumes, updateResume, updateResumePdf, updateResumePublish, deleteResume } from '../../contexts/User/Private/Resume/ResumeAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import AddNew from '../../components/Profile/Child/AddNewResume'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  FormGroup,
  IconButton,
  Modal, 
  Tooltip,
  Typography,
  Zoom,
} from '@material-ui/core'
import MaterialTable from 'material-table'
import { Icons2Use, PaginationTableCustom } from '../../components/global/TableMaterial'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'

const Resume = () => {
  const [resumeState, resumeDispatch] = useResume()
  const { resumes, loading, success, error, message } = resumeState
  
  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** global - states */
  const addNewRef = useRef(null)
  const PdfFileTypes = ['application/pdf']
  const [resumeId, setResumeId] = useState('')

  /** table icons */
  const { allIcons } = Icons2Use()

  /** resume pdf change - states */
  const [pdfChange, setPdfChange] = useState('')
  const [currentPdfSrc, setCurrentPdfSrc] = useState('')
  const [isPdfChange, setIsPdfChange] = useState(false)

  /** resume publish change - states */
  const [intention, setIntention] = useState('')
  const [isPublish, setIsPublish] = useState(false)

  /** resume update - states */
  const [websiteChange, setWebsiteChange] = useState('')
  const [titleChange, setTitleChange] = useState('')
  const [descChange, setDescChange] = useState('')
  const [techsChange, setTechsChange] = useState([])
  const [projsChange, setProjsChange] = useState([])
  const [edusChange, setEdusChange] = useState([])
  const [jobsChange, setJobsChange] = useState([])
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

  /** resume pdf change - function */
  const handlePdfUpdate = async() => {
    if(!pdfChange) return setError(resumeDispatch, { status: true, message: 'Cannot send blank file!' })
    
    await updateResumePdf(resumeDispatch, resumeId, {
      new: pdfChange, 
      old: currentPdfSrc 
    })

    setLoading(resumeDispatch, false)
    setResumeId('')
    setPdfChange('')
    setCurrentPdfSrc('')
    setIsPdfChange(false)
  }

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
      title: titleChange,
      description: descChange,
      techs: techsChange,
      projects: projsChange,
      educations: edusChange,
      jobs: jobsChange
    })

    setLoading(resumeDispatch, false)
    setWebsiteChange('')
    setTitleChange('')
    setDescChange('')
    setTechsChange([])
    setProjsChange([])
    setEdusChange([])
    setJobsChange([])
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
      <Modal
        open={isPdfChange}
        onClose={() => {
          setResumeId('')
          setPdfChange('')
          setCurrentPdfSrc('')
          setIsPdfChange(false)
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.photoModal}>
          <form className={classes.photoChangeForm}>
            <FormGroup>
              <input 
                accept="application/pdf" 
                className={classes.photoInput} 
                id="icon-button-file-change"
                type="file"
                onChange={(e) => {
                  let selectedPdf = e.target.files[0]
                  
                  if(selectedPdf && PdfFileTypes.includes(selectedPdf.type)) setPdfChange(selectedPdf)
                }} 
                required 
              />
              <label htmlFor="icon-button-file-change"  className={classes.photoLabel}>
                <Tooltip TransitionComponent={Zoom} title="Add pdf" placement="top-start">
                  <IconButton color="primary" aria-label="upload picture" component="span" classes={{root: classes.iconButtonPhoto}}>
                    <PictureAsPdfIcon /> 
                  </IconButton>
                </Tooltip>
                <Typography className={classes.photoLabelText} variant="subtitle1">
                  {pdfChange ? pdfChange.name : 'No Pdf Selected'}
                </Typography>
              </label>
            </FormGroup>
            <Button  
              variant="contained" 
              color="secondary" 
              className={classes.photoChangeFormSubmitBtn}
              onClick={e => {
                // e.preventDefault()
                handlePdfUpdate()
              }}
            >
              Change Photo
            </Button>
          </form>
        </div>
      </Modal>
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
              title: 'File', 
              field: 'pdfSrc',
              render: rowData => <a href={'/files/' + rowData.pdfSrc} target='_blank' className={classes.pdfLink}>{rowData.pdfSrc}</a> 
            },
            { 
              title: 'Website', 
              field: 'website',
              render: rowData => handleNoneValue(rowData.contactInfo.website) 
            },
            { 
              title: 'Title', 
              field: 'title',
              render: rowData => handleNoneValue(rowData.contactInfo.title) 
            },
            { 
              title: 'Description', 
              field: 'description',
              render: rowData => <p style={{maxHeight: 100, overflow: 'auto'}}>{handleNoneValue(rowData.description)}</p> 
            },
            { 
              title: 'Techs', 
              field: 'techs',
              render: rowData => {
                if(rowData.techs?.length > 0) return (
                  <ul className={classes.ulTable}>
                    {(rowData.techs.sort((a, b) => a.name < b.name ? -1 : 1)).map(tech => (
                      <li key={tech._id}>
                        {tech.name}
                      </li>
                    ))}
                  </ul>
                )
                else return 'N/A'
              },
              sorting: false 
            },
            { 
              title: 'Projects', 
              field: 'projects',
              render: rowData => {
                if(rowData.projects?.length > 0) return (
                  <ul className={classes.ulTable}>
                    {(rowData.projects.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))).map(project => (
                      <li key={project._id}>
                        {project.name} (<span style={{ color: theme.palette.secondary.main }}>{new Date(project.publishedAt).toDateString()}</span>)
                      </li>
                    ))}
                  </ul>
                )
                else return 'N/A'
              },
              sorting: false 
            },
            { 
              title: 'Edus', 
              field: 'educations',
              render: rowData => {
                if(rowData.educations?.length > 0) return (
                  <ul className={classes.ulTable}>
                    {(rowData.educations.sort((a, b) => a.course < b.course ? -1 : 1)).map(edu => (
                      <li key={edu._id}>
                        {edu.course} {edu.entity !== '' && <>(<span style={{ color: theme.palette.secondary.main }}>{edu.entity}</span>)</>}
                      </li>
                    ))}
                  </ul>
                )
                else return 'N/A'
              },
              sorting: false 
            },
            { 
              title: 'Jobs', 
              field: 'jobs',
              render: rowData => {
                if(rowData.jobs?.length > 0) return (
                  <ul className={classes.ulTable}>
                    {(rowData.jobs.sort((a, b) => a.name < b.name ? -1 : 1)).map(job => (
                      <li key={job._id}>
                        {job.name} {job.company !== '' && <>(<span style={{ color: theme.palette.secondary.main }}>{job.company}</span>)</>}
                      </li>
                    ))}
                  </ul>
                )
                else return 'N/A'
              },
              sorting: false 
            },
          ]}
          actions={[
            {
              icon: allIcons.NewPdf,
              tooltip: 'Change Pdf',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setResumeId(rowData._id)
                setCurrentPdfSrc(rowData.pdfSrc)
                setIsPdfChange(true)
                setIsEdit(false)
                setWebsiteChange('')
                setTitleChange('')
                setDescChange('')
                setTechsChange([])
                setProjsChange([])
                setEdusChange([])
                setJobsChange([])
              }
            },
            {
              icon: allIcons.Edit,
              tooltip: 'Edit Resume',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setWebsiteChange(handleNoneValue(rowData.contactInfo.website))
                setTitleChange(handleNoneValue(rowData.contactInfo.title))
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
                setEdusChange(() => {
                  let edus = []
                  rowData.educations.forEach(edu => edus.push(edu._id))
                  return edus
                })
                setJobsChange(() => {
                  let jobs = []
                  rowData.jobs.forEach(job => jobs.push(job._id))
                  return jobs
                })
                setResumeId(rowData._id)
                setIsPdfChange(false)
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
        globalClasses={classes}
        PdfFileTypes={PdfFileTypes}
        addNewRef={addNewRef}
        isEdit={isEdit} setIsEdit={setIsEdit}
        handleResumeUpdate={handleResumeUpdate}
        setResumeId={setResumeId}
        websiteChange={websiteChange} setWebsiteChange={setWebsiteChange}
        titleChange={titleChange} setTitleChange={setTitleChange}
        descChange={descChange} setDescChange={setDescChange}
        techsChange={techsChange} setTechsChange={setTechsChange}
        projsChange={projsChange} setProjsChange={setProjsChange}
        edusChange={edusChange} setEdusChange={setEdusChange}
        jobsChange={jobsChange} setJobsChange={setJobsChange}
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
  },
  pdfLink: {
    textDecoration: 'none',
    '&:link': {
      color: theme.palette.secondary.main
    },
    '&:visited': {
      color: theme.palette.secondary.main
    },
    '&:hover': {
      color: theme.palette.secondary.main
    },
    '&:active': {
      color: theme.palette.secondary.main
    },
  },
  photoModal: {
    position: 'absolute',
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    minWidth: 220,
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  photoChangeForm: {
    width: 223,
    height: 120,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoChangeFormSubmitBtn: {
    color: theme.palette.common.white,
    marginTop: 20
  },
  img: {
    maxWidth: 100,
  },
  photoInput: {
    display: 'none'
  },
  iconButtonPhoto: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  photoLabel: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
  },
  photoLabelText: {
    marginLeft: '15px',
    width: '100%', 
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  },
}))