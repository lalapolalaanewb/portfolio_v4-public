import React from 'react'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Paper, Table, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'

export const TableCustom = ({
  rowsPerPageOptions, count, page, onChangePage, rowsPerPage, onChangeRowsPerPage,
  children
}) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        {children}
      </Table>
      <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={count}
          page={page}
          onChangePage={onChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          className={theme.palette.type === 'light' ? classes.tablePagination : classNames(classes.tableHead, classes.tablePaginationLight)}
        />
    </TableContainer>
  )
}

export const TableHeadCustom = ({children}) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <TableHead className={theme.palette.type === 'light' ? classes.tableHead : classNames(classes.tableHead, classes.tableHeadLight)}>
      <TableRow>
        {children}
      </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles(theme => ({
  table:{
    // minWidth: 1480,
  },
  tableHead: {
    backgroundColor: theme.palette.grey[200]
  },
  tableHeadLight: {
    backgroundColor: theme.palette.lighten.light
  },
  tablePagination: {
    backgroundColor: theme.palette.grey[200]
  },
  tablePaginationLight: {
    backgroundColor: theme.palette.lighten.light
  },
}))