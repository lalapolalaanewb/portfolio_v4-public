import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Pagination } from '@material-ui/lab'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

const Paginate = ({
  pageNumber, 
  currentPage, setCurrentPage,
  dataPerPage, setDataPerPage,
  groupNum
}) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.pagination}>
        <FormControl className={classes.formControl}>
          <InputLabel id="group-page-num">Per Page</InputLabel>
          <Select
            labelId="group-page-num"
            value={dataPerPage}
            onChange={e => setDataPerPage(e.target.value)}
            classes={{
              root: classes.selectGroupNum
            }}
          >
            {groupNum.map(group => <MenuItem key={group} value={group}>{group}</MenuItem>)}
          </Select>
        </FormControl>
        <Pagination 
          variant="outlined" 
          color="secondary" 
          shape="rounded"
          className={classes.pagination} 
          count={pageNumber} 
          page={currentPage} 
          onChange={(e, value) => setCurrentPage(value)} 
        />
      </div>
    </>
  )
}

export default Paginate

const useStyles = makeStyles((theme) => ({
  pagination: {
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'center',
    }
  },
  formControl: {
    minWidth: 80,
    marginRight: '1rem'
  },
  selectGroupNum: {
    color: theme.palette.secondary.main
  },
}))