import React, { useEffect } from 'react'
import { usePolicy } from '../../contexts/Policy/Public/PolicyState'
import { setLoading, setError, getPolicyComment } from '../../contexts/Policy/Public/PolicyAction'
import ReactMarkDown from 'react-markdown'
import Markdown from '../../components/global/Markdown'
import { MarkDownStyles } from '../../components/global/Markdown'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { FaTimes } from 'react-icons/fa'

const PolicyComment = () => {
  const [policyState, policyDispatch] = usePolicy()
  const { policyComment, loading, error, message } = policyState

  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  /** markdown - states */
  const { markdownStyles } = MarkDownStyles()

  /** get policy comment - function */
  useEffect(() => {
    (async() => {
      await getPolicyComment(policyDispatch)

      setLoading(policyDispatch, false)
    })()
  }, [])

  return (
    <div className={classes.section}>
      <div className={classes.wrapper}>
        {loading && <div className="lds-hourglass"></div>}
        {error && (
          <div className="error__container">
            <FaTimes size={20} className="error__btn" 
              onClick={() => setError(policyDispatch, {status: false, message: ''})} 
            />
            <p className="error__message message__break">{message}</p>
          </div>
        )}
        <div className={theme.palette.type === 'light' ? classNames(classes.description, markdownStyles.mdContainer, markdownStyles.mdContainerDark) : classNames(classes.description, markdownStyles.mdContainer, markdownStyles.mdContainerLight)}>
          {policyComment !== '' ? <ReactMarkDown source={policyComment} renderers={{ code: Markdown }}/> : 'none'}
        </div>
      </div>
    </div>
  )
}

export default PolicyComment

const useStyles = makeStyles(theme => ({
  section: {
    position: 'relative',
    padding: '6.25rem 0 6.25rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    width: '100%',
    maxWidth: '1300px',
    paddingRight: '50px',
    paddingLeft: '50px',
    [theme.breakpoints.down('md')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
  description: {
    width: '100%',
    maxWidth: '901px',
    padding: '0 100px',
    [theme.breakpoints.down('md')]: {
      padding: '0 15px'
    },
  },
}))