import React, { useState, useEffect, useRef } from 'react'
import { usePosts } from '../../contexts/Posts/Private/PostsState'
import { setLoading, setError, setSuccess, getPosts, updatePostImg, updatePostPublish, updatePost, deletePost } from '../../contexts/Posts/Private/PostsAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import { DisqusCommentCount } from '../../components/global/Disqus'
import AddNew from '../../components/Blog/Private/AddNew'
import ReactMarkDown from 'react-markdown'
import Markdown from '../../components/global/Markdown'
import { MarkDownStyles } from '../../components/global/Markdown'
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

const Posts = () => {
  const [postsState, postsDispatch] = usePosts()
  const { posts, loading, success, error, message } = postsState

  /** page specific state & function */
  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** markdown - states */
  const { markdownStyles } = MarkDownStyles()

  /** global - states */
  const addNewRef = useRef(null)
  const ImgFileTypes = ['image/png', 'image/jpeg']
  const [postId, setPostId] = useState('')

  /** table icons */
  const { allIcons } = Icons2Use()

  /** post img change - states */
  const [imgChange, setImgChange] = useState('')
  const [currentImgSrc, setCurrentImgSrc] = useState('')
  const [isImgChange, setIsImgChange] = useState(false)

  /** post publish change - states */
  const [intention, setIntention] = useState('')
  const [isPublish, setIsPublish] = useState(false)

  /** post update - states */
  const [titleChange, setTitleChange] = useState('')
  const [excerptChange, setExcerptChange] = useState('')
  const [techChange, setTechChange] = useState('')
  const [creatorChange, setCreatorChange] = useState('')
  const [currentCreator, setCurrentCreator] = useState('')
  const [descChange, setDescChange] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** posts get all - function */
  useEffect(() => {
    (async() => {
      await getPosts(postsDispatch)

      setLoading(postsDispatch, false)
    })()
  }, [])

  /** post img change - function */
  const handleImgUpdate = async() => {
    if(!imgChange) return setError(postsDispatch, { status: true, message: 'Cannot send blank file!' })
    
    await updatePostImg(postsDispatch, postId, imgChange, currentImgSrc)

    setLoading(postsDispatch, false)
    setPostId('')
    setImgChange('')
    setCurrentImgSrc('')
    setIsImgChange(false)
  }

  /** post publish - function */
  useEffect(() => {
    (async() => {
      if(isPublish) {
        await updatePostPublish(postsDispatch, postId, intention)

        setLoading(postsDispatch, false)
        setPostId('')
        setIntention('')
        setIsPublish(false)
      }
    })()
  }, [isPublish])

  /** post update - function */
  const handlePostUpdate = async() => {
    await updatePost(postsDispatch, postId, {
      title: titleChange,
      excerpt: excerptChange,
      tech: techChange,
      description: descChange,
      creator: {
        current: currentCreator,
        new: creatorChange
      },
    })

    setLoading(postsDispatch, false)
    setTitleChange('')
    setExcerptChange('')
    setTechChange('')
    setCreatorChange('')
    setCurrentCreator('')
    setDescChange('')
    setPostId('')
    setIsEdit(false)
  }

  /** post delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deletePost(postsDispatch, postId, currentCreator)

        setLoading(postsDispatch, false)
        setPostId('')
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
          dispatch={postsDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={postsDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <Modal
        open={isImgChange}
        onClose={() => {
          setPostId('')
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
          title="Posts Table"
          data={[...posts]}
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
          detailPanel={rowData => {
            return (
              <div style={{backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.lighten.light}}>
                <div className={classes.tableExcerpt}>
                  <Typography variant="h5">Excerpt</Typography>
                  <Typography variant="body1">{rowData.excerpt !== '' ? rowData.excerpt : 'none'}</Typography>
                </div>
                <div className={theme.palette.type === 'light' ? classNames(classes.tableDesc, markdownStyles.mdContainer, markdownStyles.mdContainerDark) : classNames(classes.tableDesc, markdownStyles.mdContainer, markdownStyles.mdContainerLight)}>
                <Typography variant="h5">Description</Typography>
                  {rowData.description !== '' ? <ReactMarkDown source={rowData.description} renderers={{ code: Markdown }}/> : 'none'}
                </div>
              </div>
            )
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
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
            { title: 'Title', field: 'title' },
            { 
              title: 'Comments', 
              field: 'like',
              render: rowData => (
                <DisqusCommentCount id={rowData._id} title={rowData.title} shareUrl={window.location.href} origin=""/>
              ),  
            },
            { 
              title: 'Tech', 
              field: 'tech',
              render: rowData => rowData.tech.name,
              customSort: (a, b) => a.tech.name < b.tech.name ? -1 : 1 
            },
            { 
              title: 'Publish At', 
              field: 'publishedAt',
              render: rowData => new Date(rowData.publishedAt).toDateString(), 
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
              icon: allIcons.NewImg,
              tooltip: 'Change Image',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setPostId(rowData._id)
                setCurrentImgSrc(rowData.imgSrc)
                setIsImgChange(true)
                setIsEdit(false)
                setTitleChange('')
                setExcerptChange('')
                setTechChange('')
                setCreatorChange('')
                setCurrentCreator('')
                setDescChange('')
              }
            },
            {
              icon: allIcons.Edit,
              tooltip: 'Edit Post',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setTitleChange(rowData.title)
                setExcerptChange(() => rowData.excerpt ? rowData.excerpt : 'none')
                setTechChange(rowData.tech._id)
                setDescChange(() => rowData.description ? rowData.description : 'none')
                setCreatorChange(rowData.creator._id)
                setCurrentCreator(rowData.creator._id)
                setPostId(rowData._id)
                setIsEdit(true)
                setIsImgChange(false)
                addNewRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            },
            rowData => ({
              icon: allIcons.Delete,
              tooltip: 'Delete Post',
              onClick: (event, rowData) => {
                setCurrentCreator(rowData.creator._id)
                setPostId(rowData._id)
                setIsDelete(true)
              },
              disabled: rowData.status === 1 
            }),
            rowData => ({
              icon: rowData.status === 0 ? allIcons.Publish : allIcons.Unpublish,
              tooltip: rowData.status === 0 ? 'Publish' : 'Unpublish',
              onClick: (event, rowData) => {
                setPostId(rowData._id)
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
        handlePostUpdate={handlePostUpdate}
        setPostId={setPostId}
        titleChange={titleChange} setTitleChange={setTitleChange}
        excerptChange={excerptChange} setExcerptChange={setExcerptChange}
        techChange={techChange} setTechChange={setTechChange}
        descChange={descChange} setDescChange={setDescChange}
        creatorChange={creatorChange} setCreatorChange={setCreatorChange}
        setCurrentCreator={setCurrentCreator}
      />
    </>
  )
}

export default Posts

const useStyles = makeStyles(theme => ({
  tableExcerpt: {
    padding: theme.spacing(3)
  },
  tableDesc: {
    padding: theme.spacing(3)
  },
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
    maxWidth: 223,
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