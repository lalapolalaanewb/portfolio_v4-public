import React, { useState, useEffect, useRef } from 'react'
import { useTechnology } from '../../contexts/Technology/TechnologyState'
import { setLoading, setSuccess, setError, getTechs, updateTech, deleteTech } from '../../contexts/Technology/TechnologyAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import AddNew from '../../components/Techs/AddNew'
import { useTheme } from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import { Icons2Use, PaginationTableCustom } from '../../components/global/TableMaterial'

const Techs = () => {
  const [techState, techDispatch] = useTechnology()
  const { techs, loading, success, error, message } = techState

  /** theme - states */
  const theme = useTheme()

  /** table - icons */
  const { allIcons } = Icons2Use()

  /** global - states */
  const addNewRef = useRef(null)
  const [techId, setTechId] = useState('')

  /** tech update - states */
  const [nameChange, setNameChange] = useState('')
  const [abbreviationChange, setAbbreviationChange] = useState('')
  const [creatorChange, setCreatorChange] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** skill get all - function */
  useEffect(() => {
    (async() => {
      await getTechs(techDispatch)

      setLoading(techDispatch, false)
    })()
  }, [])

  /** tech update - function */
  const handleTechUpdate = async() => {
    await updateTech(techDispatch, techId, {
      name: nameChange,
      abbreviation: abbreviationChange,
      creator: creatorChange
    })

    setLoading(techDispatch, false)
    setTechId('')
    setNameChange('')
    setAbbreviationChange('')
    setCreatorChange('')
    setIsEdit(false)
  }

  /** tech delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteTech(techDispatch, techId)

        setLoading(techDispatch, false)
        setTechId('')
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
          dispatch={techDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={techDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <div style={{width: '100%'}}>
      <MaterialTable
          icons={allIcons}
          title="Techs Table"
          data={techs}
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
              tooltip: 'Edit Tech',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setNameChange(rowData.name)
                setAbbreviationChange(rowData.abbreviation)
                setCreatorChange(rowData.creator._id)
                setTechId(rowData._id)
                setIsEdit(true)
                addNewRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            },
            {
              icon: allIcons.Delete,
              tooltip: 'Delete Tech',
              onClick: (event, rowData) => {
                setTechId(rowData._id)
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
        handleTechUpdate={handleTechUpdate}
        setTechId={setTechId}
        nameChange={nameChange} setNameChange={setNameChange} 
        abbreviationChange={abbreviationChange} setAbbreviationChange={setAbbreviationChange}
        creatorChange={creatorChange} setCreatorChange={setCreatorChange}
      />
    </>
  )
}

export default Techs