import React, { useState, useEffect, useRef } from 'react'
import { useEducation } from '../../contexts/User/Private/Education/EducationState'
import { setLoading, setSuccess, setError, getEdus, updateEdu, updateEduPublish, deleteEdu } from '../../contexts/User/Private/Education/EducationAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import AddNew from '../../components/Profile/Child/AddNewEdu'
import { useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import { Icons2Use, PaginationTableCustom } from '../../components/global/TableMaterial'

const Education = () => {
  const [eduState, eduDispatch] = useEducation()
  const { edus, loading, success, error, message } = eduState
  
  /** theme - states */
  const theme = useTheme()

  /** global - states */
  const addNewRef = useRef(null)
  const [eduId, setEduId] = useState('')

  /** table icons */
  const { allIcons } = Icons2Use()

  /** edu publish change - states */
  const [intention, setIntention] = useState('')
  const [isPublish, setIsPublish] = useState(false)

  /** edu update - states */
  const [courseChange, setCourseChange] = useState('')
  const [titleChange, setTitleChange] = useState('')
  const [entityChange, setEntityChange] = useState('')
  const [studyStatusChange, setStudyStatusChange] = useState('')
  const [currentCreator, setCurrentCreator] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** edu get all - function */
  useEffect(() => {
    (async() => {
      await getEdus(eduDispatch)

      setLoading(eduDispatch, false)
    })()
  }, [])

  /** edu publish - function */
  useEffect(() => {
    (async() => {
      if(isPublish) {
        await updateEduPublish(eduDispatch, eduId, intention)

        setLoading(eduDispatch, false)
        setEduId('')
        setIntention('')
        setIsPublish(false)
      }
    })()
  }, [isPublish])

  /** edu update - function */
  const handleEduUpdate = async() => {
    await updateEdu(eduDispatch, eduId, {
      course: courseChange,
      title: titleChange,
      entity: entityChange,
      studyStatus: studyStatusChange,
    })

    setLoading(eduDispatch, false)
    setCourseChange('')
    setTitleChange('')
    setEntityChange('')
    setStudyStatusChange('')
    setEduId('')
    setIsEdit(false)
  }

  /** edu delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteEdu(eduDispatch, eduId, currentCreator)

        setLoading(eduDispatch, false)
        setEduId('')
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
          dispatch={eduDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={eduDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <div style={{width: '100%'}}>
        <MaterialTable
          icons={allIcons}
          title="Edus Table"
          data={edus}
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
              title: 'Course', 
              field: 'course',
              render: rowData => handleNoneValue(rowData.course) 
            },
            { 
              title: 'Title', 
              field: 'title',
              render: rowData => handleNoneValue(rowData.title) 
            },
            { 
              title: 'Entity', 
              field: 'entity',
              render: rowData => handleNoneValue(rowData.entity) 
            },
            { title: 'Status', field: 'studyStatus' },
          ]}
          actions={[
            {
              icon: allIcons.Edit,
              tooltip: 'Edit Edu',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setCourseChange(handleNoneValue(rowData.course))
                setTitleChange(handleNoneValue(rowData.title))
                setEntityChange(handleNoneValue(rowData.entity))
                setStudyStatusChange(rowData.studyStatus)
                setEduId(rowData._id)
                setIsEdit(true)
                addNewRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            },
            rowData => ({
              icon: allIcons.Delete,
              tooltip: 'Delete Edu',
              onClick: (event, rowData) => {
                setCurrentCreator(rowData.creator)
                setEduId(rowData._id)
                setIsDelete(true)
              },
              disabled: rowData.status === 1
            }),
            rowData => ({
              icon: rowData.status === 0 ? allIcons.Publish : allIcons.Unpublish,
              tooltip: rowData.status === 0 ? 'Publish' : 'Unpublish',
              onClick: (event, rowData) => {
                setEduId(rowData._id)
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
        handleEduUpdate={handleEduUpdate}
        setEduId={setEduId}
        courseChange={courseChange} setCourseChange={setCourseChange}
        titleChange={titleChange} setTitleChange={setTitleChange}
        entityChange={entityChange} setEntityChange={setEntityChange}
        studyStatusChange={studyStatusChange} setStudyStatusChange={setStudyStatusChange}
      />
    </>
  )
}

export default Education