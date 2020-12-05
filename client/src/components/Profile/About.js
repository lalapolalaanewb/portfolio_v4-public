import React, { useState, useEffect, useRef } from 'react'
import { useAbout } from '../../contexts/User/Private/About/AboutState'
import { setLoading, setSuccess, setError, getAbouts, updateAbout, updateAboutImg, updateAboutPublish, deleteAbout } from '../../contexts/User/Private/About/AboutAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import AddNew from '../../components/Profile/Child/AddNewAbout'
import classNames from 'classnames'
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

const About = () => {
  const [aboutState, aboutDispatch] = useAbout()
  const { abouts, loading, success, error, message } = aboutState
  
  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** global - states */
  const addNewRef = useRef(null)
  const ImgFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']
  const [aboutId, setAboutId] = useState('')

  /** table icons */
  const { allIcons } = Icons2Use()

  /** about img change - states */
  const [imgChange, setImgChange] = useState('')
  const [currentImgSrc, setCurrentImgSrc] = useState('')
  const [isImgChange, setIsImgChange] = useState(false)

  /** about publish change - states */
  const [intention, setIntention] = useState('')
  const [isPublish, setIsPublish] = useState(false)

  /** about update - states */
  const [titleChange, setTitleChange] = useState('')
  const [descChange, setDescChange] = useState('')
  const [btnPurposeChange, setBtnPurposeChange] = useState('')
  const [btnLabelChange, setBtnLabelChange] = useState('')
  const [btnLinkChange, setBtnLinkChange] = useState('')
  const [imgPosChange, setImgPosChange] = useState('')
  const [currentCreator, setCurrentCreator] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** about get all - function */
  useEffect(() => {
    (async() => {
      await getAbouts(aboutDispatch)

      setLoading(aboutDispatch, false)
    })()
  }, [])

  /** about img change - function */
  const handleImgUpdate = async() => {
    if(!imgChange) return setError(aboutDispatch, { status: true, message: 'Cannot send blank file!' })
    
    await updateAboutImg(aboutDispatch, aboutId, {
      new: imgChange, 
      old: currentImgSrc 
    })

    setLoading(aboutDispatch, false)
    setAboutId('')
    setImgChange('')
    setCurrentImgSrc('')
    setIsImgChange(false)
  }

  /** about publish - function */
  useEffect(() => {
    (async() => {
      if(isPublish) {
        await updateAboutPublish(aboutDispatch, aboutId, intention)

        setLoading(aboutDispatch, false)
        setAboutId('')
        setIntention('')
        setIsPublish(false)
      }
    })()
  }, [isPublish])

  /** about update - function */
  const handleAboutUpdate = async() => {
    await updateAbout(aboutDispatch, aboutId, {
      title: titleChange,
      description: descChange,
      btnPurpose: btnPurposeChange,
      btnLabel: btnLabelChange,
      btnLink: btnLinkChange,
      imgPosition: imgPosChange
    })

    setLoading(aboutDispatch, false)
    setTitleChange('')
    setDescChange('')
    setBtnPurposeChange('')
    setBtnLabelChange('')
    setBtnLinkChange('')
    setImgPosChange('')
    setAboutId('')
    setIsEdit(false)
  }

  /** about delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteAbout(aboutDispatch, aboutId, currentCreator)

        setLoading(aboutDispatch, false)
        setAboutId('')
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
          dispatch={aboutDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={aboutDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <Modal
        open={isImgChange}
        onClose={() => {
          setAboutId('')
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
          title="Abouts Table"
          data={abouts}
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
            { title: 'Title', field: 'title' },
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
                setAboutId(rowData._id)
                setCurrentImgSrc(rowData.imgSrc)
                setIsImgChange(true)
                setIsEdit(false)
                setTitleChange('')
                setDescChange('')
                setBtnPurposeChange('')
                setBtnLabelChange('')
                setBtnLinkChange('')
                setImgPosChange('')
              }
            },
            {
              icon: allIcons.Edit,
              tooltip: 'Edit About',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setTitleChange(rowData.title)
                setDescChange(handleNoneValue(rowData.description))
                setBtnPurposeChange(rowData.btnPurpose)
                setBtnLabelChange(rowData.btnLabel)
                setBtnLinkChange(rowData.btnLink)
                setImgPosChange(rowData.imgPosition)
                setAboutId(rowData._id)
                setIsEdit(true)
                setIsImgChange(false)
                addNewRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            },
            rowData => ({
              icon: allIcons.Delete,
              tooltip: 'Delete About',
              onClick: (event, rowData) => {
                setCurrentCreator(rowData.creator)
                setAboutId(rowData._id)
                setIsDelete(true)
              },
              disabled: rowData.status === 1
            }),
            rowData => ({
              icon: rowData.status === 0 ? allIcons.Publish : allIcons.Unpublish,
              tooltip: rowData.status === 0 ? 'Publish' : 'Unpublish',
              onClick: (event, rowData) => {
                setAboutId(rowData._id)
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
        handleAboutUpdate={handleAboutUpdate}
        setAboutId={setAboutId}
        titleChange={titleChange} setTitleChange={setTitleChange}
        descChange={descChange} setDescChange={setDescChange}
        btnPurposeChange={btnPurposeChange} setBtnPurposeChange={setBtnPurposeChange}
        btnLabelChange={btnLabelChange} setBtnLabelChange={setBtnLabelChange}
        btnLinkChange={btnLinkChange} setBtnLinkChange={setBtnLinkChange}
        imgPosChange={imgPosChange} setImgPosChange={setImgPosChange}
      />
    </>
  )
}

export default About

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