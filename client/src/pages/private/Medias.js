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
  Modal,
  Tooltip, 
  Typography, 
  Zoom,
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

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
          {tryy.map((media) => (
            <GridListTile key={media._id} className={classes.imgListTile}>
              <img src={'/images/' + media.imgSrc} alt={media.imgAlt} />
              <GridListTileBar
                title={media.imgAlt}
                subtitle={<span>by: {media.creator.name.firstName}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${media.imgAlt}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
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
  { _id: '1a', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1b', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1c', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1d', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1e', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1f', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1g', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1h', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1i', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1j', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1k', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1l', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1m', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1n', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1o', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
  { _id: '1p', imgSrc: 'blog_sendCustomDomainEmail_1.PNG', imgAlt: 'Custom Domain', creator: { name: { firstName: 'Fathi' } } },
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
    maxHeight: 555.45,
  },
  imgListTile: {
    maxWidth: 345, 
    maxHeight: 185.15,
    '@media (max-width: 450px)': {
      minWidth: 255
    }
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}))