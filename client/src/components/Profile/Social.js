import React, { useState, useEffect, useRef } from 'react'
import { useSocial } from '../../contexts/User/Private/Social/SocialState'
import { setLoading, setSuccess, setError, getSocials, updateSocial, updateSocialPublish, deleteSocial } from '../../contexts/User/Private/Social/SocialAction'
import AlertMessage from '../../components/global/Alert'
import { DividerBlank } from '../../components/global/Divider'
import AddNew from '../../components/Profile/Child/AddNewSocial'
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
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaPodcast, FaReddit, FaTwitter, FaYoutube } from 'react-icons/fa'
const Social = () => {
  const [socialState, socialDispatch] = useSocial()
  const { socials, loading, success, error, message } = socialState
  
  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** global - states */
  const addNewRef = useRef(null)
  const [socialId, setSocialId] = useState('')

  /** table icons */
  const { allIcons } = Icons2Use()

  /** social publish change - states */
  const [intention, setIntention] = useState('')
  const [isPublish, setIsPublish] = useState(false)

  /** social update - states */
  const [nameChange, setNameChange] = useState('')
  const [iconChange, setIconChange] = useState('')
  const [urlChange, setUrlChange] = useState('')
  const [currentCreator, setCurrentCreator] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  /** social get all - function */
  useEffect(() => {
    (async() => {
      await getSocials(socialDispatch)

      setLoading(socialDispatch, false)
    })()
  }, [])

  /** social publish - function */
  useEffect(() => {
    (async() => {
      if(isPublish) {
        await updateSocialPublish(socialDispatch, socialId, intention)

        setLoading(socialDispatch, false)
        setSocialId('')
        setIntention('')
        setIsPublish(false)
      }
    })()
  }, [isPublish])

  /** social update - function */
  const handleSocialUpdate = async() => {
    await updateSocial(socialDispatch, socialId, {
      name: nameChange,
      icon: iconChange,
      url: urlChange,
    })

    setLoading(socialDispatch, false)
    setNameChange('')
    setIconChange('')
    setUrlChange('')
    setSocialId('')
    setIsEdit(false)
  }

  /** social delete - function */
  useEffect(() => {
    (async() => {
      if(isDelete) {
        await deleteSocial(socialDispatch, socialId, currentCreator)

        setLoading(socialDispatch, false)
        setSocialId('')
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
          dispatch={socialDispatch} message={message} 
          setStatus={setError}
        />
      )}
      {success && (
        <AlertMessage
          severity="success" title="Success"
          dispatch={socialDispatch} message={message} 
          setStatus={setSuccess}
        />
      )}
      <div style={{width: '100%'}}>
        <MaterialTable
          icons={allIcons}
          title="Socials Table"
          data={socials}
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
            { title: 'Name', field: 'name' },
            { 
              title: 'Icon', 
              field: 'icon',
              render: rowData => {
                if(rowData.icon.name === 'LinkedIn') return <FaLinkedin size={44} />
                if(rowData.icon.name === 'Github') return <FaGithub size={44} />
                if(rowData.icon.name === 'Youtube') return <FaYoutube size={44} />
                if(rowData.icon.name === 'Facebook') return <FaFacebook size={44} />
                if(rowData.icon.name === 'Instagram') return <FaInstagram size={44} />
                if(rowData.icon.name === 'Twitter') return <FaTwitter size={44} />
                if(rowData.icon.name === 'Reddit') return <FaReddit size={44} />
                if(rowData.icon.name === 'Podcast') return <FaPodcast size={44} />
              }, 
              sorting: false,
            },
            { title: 'Url', field: 'url', sorting: false },
          ]}
          actions={[
            {
              icon: allIcons.Edit,
              tooltip: 'Edit Social',
              // iconProps: { style: { color: 'red' } },
              onClick: (event, rowData) => {
                setNameChange(rowData.name)
                setIconChange(rowData.icon._id)
                setUrlChange(rowData.url)
                setSocialId(rowData._id)
                setIsEdit(true)
                addNewRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            },
            rowData => ({
              icon: allIcons.Delete,
              tooltip: 'Delete Social',
              onClick: (event, rowData) => {
                setCurrentCreator(rowData.creator)
                setSocialId(rowData._id)
                setIsDelete(true)
              },
              disabled: rowData.status === 1
            }),
            rowData => ({
              icon: rowData.status === 0 ? allIcons.Publish : allIcons.Unpublish,
              tooltip: rowData.status === 0 ? 'Publish' : 'Unpublish',
              onClick: (event, rowData) => {
                setSocialId(rowData._id)
                setIntention((() => rowData.status === 0 ? 'publish' : 'unpublish')())
                setIsPublish(true)
              }
            }),
          ]}
        />
      </div>
      <DividerBlank />
      <AddNew
        addNewRef={addNewRef}
        isEdit={isEdit} setIsEdit={setIsEdit}
        handleSocialUpdate={handleSocialUpdate}
        setSocialId={setSocialId}
        nameChange={nameChange} setNameChange={setNameChange}
        iconChange={iconChange} setIconChange={setIconChange}
        urlChange={urlChange} setUrlChange={setUrlChange}
      />
    </>
  )
}

export default Social

const useStyles = makeStyles(theme => ({}))