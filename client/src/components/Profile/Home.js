import React, { useState, useEffect, useRef } from 'react'
import { useHome } from '../../contexts/User/Private/Home/HomeState'
import { setLoading, setSuccess, setError, getHomes, updateHome, updateHomeImg, updateHomePublish, deleteHome } from '../../contexts/User/Private/Home/HomeAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import AddNew from '../../components/Profile/Child/AddNewHome'
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
import PhotoCamera from '@material-ui/icons/PhotoCamera'

const Home = () => {
  const [homeState, homeDispatch] = useHome()
  const { homes, loading, success, error, message } = homeState
  
  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** global - states */
  const addNewRef = useRef(null)
  const ImgFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']
  const [homeId, setHomeId] = useState('')

  /** table icons */
  const { allIcons } = Icons2Use()

  /** home img change - states */
  const [imgChange, setImgChange] = useState('')
  const [currentImgSrc, setCurrentImgSrc] = useState('')
  const [isImgChange, setIsImgChange] = useState(false)

  /** home publish change - states */
  const [intention, setIntention] = useState('')
  const [isPublish, setIsPublish] = useState(false)

  /** home update - states */
  const [toplineChange, setToplineChange] = useState('')
  const [headlineChange, setHeadlineChange] = useState('')
  const [descChange, setDescChange] = useState('')
  const [btnPurposeChange, setBtnPurposeChange] = useState('')
  const [btnLabelChange, setBtnLabelChange] = useState('')
  const [btnLinkChange, setBtnLinkChange] = useState('')
  const [imgPosChange, setImgPosChange] = useState('')
  const [currentCreator, setCurrentCreator] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** home get all - function */
  useEffect(() => {
    (async() => {
      await getHomes(homeDispatch)

      setLoading(homeDispatch, false)
    })()
  }, [])

  /** home img change - function */
  const handleImgUpdate = async() => {
    if(!imgChange) return setError(homeDispatch, { status: true, message: 'Cannot send blank file!' })
    
    await updateHomeImg(homeDispatch, homeId, {
      new: imgChange, 
      old: currentImgSrc 
    })

    setLoading(homeDispatch, false)
    setHomeId('')
    setImgChange('')
    setCurrentImgSrc('')
    setIsImgChange(false)
  }

  /** home publish - function */
  useEffect(() => {
    (async() => {
      if(isPublish) {
        await updateHomePublish(homeDispatch, homeId, intention)

        setLoading(homeDispatch, false)
        setHomeId('')
        setIntention('')
        setIsPublish(false)
      }
    })()
  }, [isPublish])

  /** home update - function */
  const handleHomeUpdate = async() => {
    await updateHome(homeDispatch, homeId, {
      topline: toplineChange,
      headline: headlineChange,
      description: descChange,
      btnPurpose: btnPurposeChange,
      btnLabel: btnLabelChange,
      btnLink: btnLinkChange,
      imgPosition: imgPosChange
    })

    setLoading(homeDispatch, false)
    setToplineChange('')
    setHeadlineChange('')
    setDescChange('')
    setBtnPurposeChange('')
    setBtnLabelChange('')
    setBtnLinkChange('')
    setImgPosChange('')
    setHomeId('')
    setIsEdit(false)
  }

  /** home delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteHome(homeDispatch, homeId, currentCreator)

        setLoading(homeDispatch, false)
        setHomeId('')
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
          dispatch={homeDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={homeDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <Modal
        open={isImgChange}
        onClose={() => {
          setHomeId('')
          setImgChange('')
          setCurrentImgSrc('')
          setIsImgChange(false)
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.photoModal}>
          <form className={classes.photoChangeForm}>
            <FormGroup>
              <input 
                accept="image/*" 
                className={classes.photoInput} 
                id="icon-button-file-change"
                type="file"
                onChange={(e) => {
                  let selectedImg = e.target.files[0]
                  
                  if(selectedImg && ImgFileTypes.includes(selectedImg.type)) setImgChange(selectedImg)
                }} 
                required 
              />
              <label htmlFor="icon-button-file-change"  className={classes.photoLabel}>
                <Tooltip TransitionComponent={Zoom} title="Add photo" placement="top-start">
                  <IconButton color="primary" aria-label="upload picture" component="span" classes={{root: classes.iconButtonPhoto}}>
                    <PhotoCamera /> 
                  </IconButton>
                </Tooltip>
                <Typography className={classes.photoLabelText} variant="subtitle1">
                  {imgChange ? imgChange.name : 'No Image Selected'}
                </Typography>
              </label>
            </FormGroup>
            <Button  
              variant="contained" 
              color="secondary" 
              className={classes.photoChangeFormSubmitBtn}
              onClick={e => {
                // e.preventDefault()
                handleImgUpdate()
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
          title="Homes Table"
          data={homes}
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
              title: 'Image', 
              field: 'imgSrc',
              render: rowData => (
                <img
                  src={'/images/' + rowData.imgSrc}
                  className={classes.img}
                />
              ), 
              sorting: false
            },
            { title: 'Image Pos', field: 'imgPosition' },
            { title: 'Topline', field: 'topline' },
            { title: 'Headline', field: 'headline' },
            { 
              title: 'Description', 
              field: 'description',
              render: rowData => {
                return <Typography style={{overflow: 'auto', maxHeight: '100px'}}>
                  {handleNoneValue(rowData.description)}
                </Typography>
              }, 
            },
            { title: 'Button Purpose', field: 'btnPurpose' },
            { title: 'Button Label', field: 'btnLabel' },
            { title: 'Button Link', field: 'btnLink' },
          ]}
          actions={[
            {
              icon: allIcons.NewImg,
              tooltip: 'Change Image',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setHomeId(rowData._id)
                setCurrentImgSrc(rowData.imgSrc)
                setIsImgChange(true)
                setIsEdit(false)
                setToplineChange('')
                setHeadlineChange('')
                setDescChange('')
                setBtnPurposeChange('')
                setBtnLabelChange('')
                setBtnLinkChange('')
                setImgPosChange('')
              }
            },
            {
              icon: allIcons.Edit,
              tooltip: 'Edit Home',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setToplineChange(rowData.topline)
                setHeadlineChange(rowData.headline)
                setDescChange(handleNoneValue(rowData.description))
                setBtnPurposeChange(rowData.btnPurpose)
                setBtnLabelChange(rowData.btnLabel)
                setBtnLinkChange(rowData.btnLink)
                setImgPosChange(rowData.imgPosition)
                setHomeId(rowData._id)
                setIsEdit(true)
                setIsImgChange(false)
                addNewRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            },
            rowData => ({
              icon: allIcons.Delete,
              tooltip: 'Delete Home',
              onClick: (event, rowData) => {
                setCurrentCreator(rowData.creator)
                setHomeId(rowData._id)
                setIsDelete(true)
              },
              disabled: rowData.status === 1
            }),
            rowData => ({
              icon: rowData.status === 0 ? allIcons.Publish : allIcons.Unpublish,
              tooltip: rowData.status === 0 ? 'Publish' : 'Unpublish',
              onClick: (event, rowData) => {
                setHomeId(rowData._id)
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
        ImgFileTypes={ImgFileTypes}
        addNewRef={addNewRef}
        isEdit={isEdit} setIsEdit={setIsEdit}
        handleHomeUpdate={handleHomeUpdate}
        setHomeId={setHomeId}
        toplineChange={toplineChange} setToplineChange={setToplineChange}
        headlineChange={headlineChange} setHeadlineChange={setHeadlineChange}
        descChange={descChange} setDescChange={setDescChange}
        btnPurposeChange={btnPurposeChange} setBtnPurposeChange={setBtnPurposeChange}
        btnLabelChange={btnLabelChange} setBtnLabelChange={setBtnLabelChange}
        btnLinkChange={btnLinkChange} setBtnLinkChange={setBtnLinkChange}
        imgPosChange={imgPosChange} setImgPosChange={setImgPosChange}
      />
    </>
  )
}

export default Home

const useStyles = makeStyles(theme => ({
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