import React, { useState, useEffect, useRef } from 'react'
import { useMedia } from '../../contexts/Media/MediaState'
import { setLoading, setError, setSuccess, getMedias, updateMediaPublish, updateMedia, deleteMedia } from '../../contexts/Media/MediaAction'
import Headline from '../../components/global/Headline'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import AddNew from '../../components/Media/AddNew'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  FormGroup,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  ListSubheader,
  Modal,
  Tooltip, 
  Typography, 
  Zoom,
} from '@material-ui/core'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import GetApp from '@material-ui/icons/GetApp'
import Publish from '@material-ui/icons/Publish'

export const Medias = () => {
  const [mediaState, mediaDispatch] = useMedia()
  const { medias, loading, success, error, message } = mediaState

  /** page specific state & function */
  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** global - states */
  const addNewRef = useRef(null)
  const [mediaId, setMediaId] = useState('')

  /** media publish change - states */
  const [intention, setIntention] = useState('')
  const [isPublish, setIsPublish] = useState(false)

  /** media update - states */
  const [imgAltChange, setImgAltChange] = useState('')
  const [creatorChange, setCreatorChange] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** media get all - function */
  useEffect(() => {
    (async() => {
      await getMedias(mediaDispatch)

      setLoading(mediaDispatch, false)
    })()
  }, [])

  /** media publish - function */
  useEffect(() => {
    (async() => {
      if(isPublish) {
        await updateMediaPublish(mediaDispatch, mediaId, intention)

        setLoading(mediaDispatch, false)
        setMediaId('')
        setIntention('')
        setIsPublish(false)
      }
    })()
  }, [isPublish])

  /** media update - function */
  const handleMediaUpdate = async() => {
    await updateMedia(mediaDispatch, mediaId, {
      imgAlt: imgAltChange,
      creator: creatorChange
    })

    setLoading(mediaDispatch, false)
    setImgAltChange('')
    setCreatorChange('')
    setMediaId('')
    setIsEdit(false)
  }

  /** media delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteMedia(mediaDispatch, mediaId)

        setLoading(mediaDispatch, false)
        setMediaId('')
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
      <Headline headline="Grid" subHeadline="MEDIA" />
      {loading && <div className="lds-hourglass accents-ver"></div>}
      {error && (
        <AlertMessage
          severity="warning" title="Warning"
          dispatch={mediaDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={mediaDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {medias.length > 0 ? medias.map((media) => (
            <GridListTile key={media._id} className={classes.imgListTile}>
              <img src={'/images/' + media.imgSrc} alt={media.imgAlt} />
              <GridListTileBar
                title={media.imgAlt}
                subtitle={<span>by: {media.creator.name.firstName}</span>}
                actionIcon={
                  <div className={classes.icons}>
                    <IconButton aria-label={`info about ${media.imgAlt}`} className={classes.icon}
                      onClick={() => {
                        setImgAltChange(handleNoneValue(media.imgAlt))
                        setCreatorChange(media.creator._id)
                        setMediaId(media._id)
                        setIsEdit(true)
                        addNewRef.current.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      <Edit />
                    </IconButton>
                    {media.status === 0 && (
                      <IconButton aria-label={`info about ${media.imgAlt}`} className={classes.icon}
                        onClick={() => {
                          setMediaId(media._id)
                          setIsDelete(true)
                        }}
                      >
                        <DeleteOutline />
                      </IconButton>
                    )}
                    <IconButton aria-label={`info about ${media.imgAlt}`} className={classes.icon}
                      onClick={() => {
                        setMediaId(media._id)
                        setIntention((() => media.status === 0 ? 'publish' : 'unpublish')())
                        setIsPublish(true)
                      }}                    
                    >
                      {media.status === 0 ? <Publish /> : <GetApp />}
                    </IconButton>
                  </div>
                }
              />
            </GridListTile>
          )) : (
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">No image available</ListSubheader>
            </GridListTile>
          )}
        </GridList>
      </div>
      <DividerBlank />
      <AddNew
        addNewRef={addNewRef}
        isEdit={isEdit} setIsEdit={setIsEdit}
        handleMediaUpdate={handleMediaUpdate}
        setMediaId={setMediaId}
        imgAltChange={imgAltChange} setImgAltChange={setImgAltChange}
        creatorChange={creatorChange} setCreatorChange={setCreatorChange}
      />
    </>
  )
}

export default Medias

const tryy = [
  { _id: '1a', status: 1, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain Mob Psycho Mob Psycho', creator: { name: { firstName: 'Fathi Mob Psycho Mob Psycho Mob Psycho' } } },
  { _id: '1b', status: 1, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1c', status: 0, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1d', status: 1, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1e', status: 1, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1f', status: 1, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1g', status: 0, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1h', status: 1, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1i', status: 1, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1j', status: 1, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1k', status: 0, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1l', status: 0, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1m', status: 1, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1n', status: 1, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1o', status: 0, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1p', status: 1, imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 255,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    '@media (max-width: 450px)': {
      justifyContent: 'center',
    }
  },
  gridList: {
    maxHeight: 555,
  },
  imgListTile: {
    minWidth: 344,
    maxWidth: 344, 
    maxHeight: 185,
    '@media (max-width: 450px)': {
      minWidth: 255
    }
  },
  icons: {
    maxWidth: 150,
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}))