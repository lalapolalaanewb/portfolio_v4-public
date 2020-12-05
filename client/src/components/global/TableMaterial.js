import React, { forwardRef } from 'react'
import { TablePagination } from '@material-ui/core'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import GetApp from '@material-ui/icons/GetApp'
import LastPage from '@material-ui/icons/LastPage'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Publish from '@material-ui/icons/Publish'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

export const Icons2Use = () => {

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NewImg: forwardRef((props, ref) => <PhotoCamera {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    Publish: forwardRef((props, ref) => <Publish {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    Unpublish: forwardRef((props, ref) => <GetApp {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  }

  return { allIcons : tableIcons }
}

export const PaginationTableCustom = ({
  colSpan, count, page, onChangePage, rowsPerPage, onChangeRowsPerPage
}) => {
  return <TablePagination
    component="div"
    colSpan={colSpan}
    count={count}
    page={page}
    onChangePage={onChangePage}
    rowsPerPage={rowsPerPage}
    onChangeRowsPerPage={onChangeRowsPerPage}
    rowsPerPageOptions={(() => {
      let min, midMin, mid, midMax, max = count

      // set min
      max >= 5 ? min = 5 : min = max
      // set mid
      if(max / 2 > min && max / 2 < max) mid = max / 2
      // set midMin 
      if(mid / 2 > min && mid / 2 < mid) midMin = mid / 2
      // set midMax
      if(max / 2 > mid && max / 2 < max) midMax = max / 2

      let currentOpt = [min, midMin, mid, midMax, max]
      let finalOpt = []
      // check if min === max
      if(min === max) finalOpt.push(min)
      else {  
        // filter out null opt
        currentOpt.forEach(e => {
          if(e) finalOpt.push(e)
        })
      }

      // return non-null opt
      return finalOpt
    })()}
  />
}