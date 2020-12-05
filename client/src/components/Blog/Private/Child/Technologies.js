import React, { useEffect } from 'react'
import { useTechnology } from '../../../../contexts/Technology/TechnologyState'
import { setLoading, setError, getTechs } from '../../../../contexts/Technology/TechnologyAction'
import AlertMessage from '../../../global/Alert'
import { MenuItem, Select } from '@material-ui/core'

const Technologies = ({
  tech, setTech,
  isEdit,
  techChange, setTechChange
}) => {
  const [techsState, techsDispatch] = useTechnology()
  const { techs, loading, error, message } = techsState

  // get all techs
  useEffect(() =>{
    (async() => {
      await getTechs(techsDispatch)

      setLoading(techsDispatch, false)
    })();
  }, [])

  return (
    <>
      {loading && <div className="lds-hourglass accents-ver"></div>}
      {error && (
        <AlertMessage
          severity="warning" title="Warning"
          dispatch={techsDispatch} message={message} 
          setStatus={setError}
        />
      )}
      <Select
        labelId="techLabel"
        label="Tech"
        value={isEdit ? techChange : tech}
        onChange={e => isEdit ? setTechChange(e.target.value) : setTech(e.target.value)}
      >
        {techs.map(tech => <MenuItem key={tech._id} value={tech._id}>{tech.name}</MenuItem>)}
      </Select>
    </>
  )
}

export default Technologies