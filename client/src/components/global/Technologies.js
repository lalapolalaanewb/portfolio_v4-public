import React from 'react'
import { useEffect } from 'react'
import { getTechs, setLoading, setError } from '../../contexts/Technology/TechnologyAction'
import { useTechnology } from '../../contexts/Technology/TechnologyState'
import AlertMessage from './Alert'
import {
  Select, 
  Input, 
  MenuItem,
  ListItemText,
} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'

export const Technologies = ({
  techsPassed, setTechsPassed, 
  isEdit, techsChange, setTechsChange
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
      {isEdit ? (
        <Select
          labelId="techsLabel"
          label="Techs"
          multiple
          value={techsChange}
          onChange={e => setTechsChange(e.target.value)}
          // input={<Input />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {techs.map(tech => (
            <MenuItem key={tech._id} value={tech.name}>
              <Checkbox checked={techsChange.indexOf(tech.name) > -1} />
              <ListItemText primary={tech.name} />
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Select
          labelId="techsLabel"
          label="Techs"
          multiple
          value={techsPassed}
          onChange={e => setTechsPassed(e.target.value)}
          // input={<Input />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {techs.map(tech => (
            <MenuItem key={tech._id} value={tech.name}>
              <Checkbox checked={techsPassed.indexOf(tech.name) > -1} />
              <ListItemText primary={tech.name} />
            </MenuItem>
          ))}
        </Select>
      )}
    </>
  )
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}