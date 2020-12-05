import React, { useState, useEffect, useRef } from 'react'
import { useSkill } from '../../contexts/Skill/Private/SkillState'
import { setLoading, setSuccess, setError, getSkills, updateSkill, deleteSkill } from '../../contexts/Skill/Private/SkillAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import AddNew from '../../components/Skills/Private/AddNew'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { List, ListItem, ListItemText } from '@material-ui/core'
import MaterialTable from 'material-table'
import { Icons2Use, PaginationTableCustom } from '../../components/global/TableMaterial'

const Skills = () => {
  const [skillState, skillDispatch] = useSkill()
  const { skills, loading, success, error, message } = skillState

  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** table - icons */
  const { allIcons } = Icons2Use()

  /** global - states */
  const addNewRef = useRef(null)
  const [skillId, setSkillId] = useState('')

  /** post update - states */
  const [nameChange, setNameChange] = useState('')
  const [techsChange, setTechsChange] = useState([])
  const [creatorChange, setCreatorChange] = useState('')
  const [currentCreator, setCurrentCreator] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** skill get all - function */
  useEffect(() => {
    (async() => {
      await getSkills(skillDispatch)

      setLoading(skillDispatch, false)
    })()
  }, [])

  /** skill update - function */
  const handleSkillUpdate = async() => {
    await updateSkill(skillDispatch, skillId, {
      name: nameChange,
      techs: techsChange,
      creator: {
        current: currentCreator,
        new: creatorChange
      }
    })

    setLoading(skillDispatch, false)
    setSkillId('')
    setNameChange('')
    setTechsChange([])
    setCreatorChange('')
    setCurrentCreator('')
    setIsEdit(false)
  }

  /** skill delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteSkill(skillDispatch, skillId, currentCreator)

        setLoading(skillDispatch, false)
        setSkillId('')
        setCurrentCreator('')
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
          dispatch={skillDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={skillDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <div style={{width: '100%'}}>
      <MaterialTable
          icons={allIcons}
          title="Skills Table"
          data={skills}
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
            { 
              title: 'Techs', 
              field: 'techs',
              render: rowData => {
                return <List style={{ overflow: 'auto', maxHeight: '100px' }}>
                  {rowData.techs.map(tech => (
                    <ListItem key={tech._id} style={{ margin: 0, padding: 0 }}>
                      <ListItemText primary={tech.name}/>
                    </ListItem>
                  ))}
                </List>
              },
              sorting: false 
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
              tooltip: 'Edit Skill',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setNameChange(rowData.name)
                setTechsChange(() => {
                  let techs = []
                  rowData.techs.map(tech => techs.push(tech.name))
                  return techs
                })
                setCreatorChange(rowData.creator._id)
                setCurrentCreator(rowData.creator._id)
                setSkillId(rowData._id)
                setIsEdit(true)
                addNewRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            },
            {
              icon: allIcons.Delete,
              tooltip: 'Delete Skill',
              onClick: (event, rowData) => {
                setSkillId(rowData._id)
                setCurrentCreator(rowData.creator._id)
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
        handleSkillUpdate={handleSkillUpdate}
        setSkillId={setSkillId}
        nameChange={nameChange} setNameChange={setNameChange}
        techsChange={techsChange} setTechsChange={setTechsChange} 
        creatorChange={creatorChange} setCreatorChange={setCreatorChange}
        setCurrentCreator={setCurrentCreator}
      />
    </>
  )
}

export default Skills

const useStyles = makeStyles(theme => ({}))