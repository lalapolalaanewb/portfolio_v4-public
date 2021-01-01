import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../../contexts/User/Public/UserState'
import { setLoading, getUserOnFooterPublic } from '../../../contexts/User/Public/UserAction'
import { useSubscription } from '../../../contexts/Subscription/Public/SubscriptionState'
import { setLoading as setLoadingSub, setError, setSuccess, addSubMail } from '../../../contexts/Subscription/Public/SubscriptionAction'
import AlertMessage from '../../global/Alert'
import { DividerBlank } from '../../global/Divider'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'
import CodeIcon from '@material-ui/icons/Code'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaPodcast, FaReddit, FaTwitter, FaYoutube } from 'react-icons/fa'
import { CgPokemon } from 'react-icons/cg'

const Footer = () => {
  /** user - states */
  const [userState, userDispatch] = useUser()
  const { userFooterPublic } = userState

  /** sub - states */
  const [subState, subDispatch] = useSubscription()
  const { error, success, message } = subState

  const classes = useStyles()
  const theme = useTheme()

  const [email, setEmail] = useState('')
  const [submit, setSubmit] = useState(false)

  // user get data - function
  useEffect(() => {
    (async() => {
      await getUserOnFooterPublic(userDispatch)

      setLoading(userDispatch, false)
    })()
  }, [])

  // handle submit subscription
  useEffect(() => {
    (async() => {
      if(submit) {
        // do fetch
        await addSubMail(subDispatch, email)

        setLoadingSub(subDispatch, false)
        setEmail('')
        setSubmit(false)
      }
    })()
  }, [submit])

  /** handle icon to display */
  const handleIcon2Display = iconName => {
    if(iconName === 'LinkedIn') return <FaLinkedin />
    else if(iconName === 'Github') return <FaGithub />
    else if(iconName === 'Youtube') return <FaYoutube />
    else if(iconName === 'Facebook') return <FaFacebook />
    else if(iconName === 'Instagram') return <FaInstagram />
    else if(iconName === 'Twitter') return <FaTwitter />
    else if(iconName === 'Reddit') return <FaReddit />
    else if(iconName === 'Podcast') return <FaPodcast />
    else return <CgPokemon />
  }

  return (
    <div className={classes.container}>
      <section className={classes.subscription}>
        <p className={classes.subscriptionHeading}>
          Subscribe to my Newsletter to receive the latest news and trends
        </p>
        <p className={classes.subscriptionText}>
          You can unsubscribe at any time
        </p>
        {error && (
          <>
            <AlertMessage
              severity="warning" title="Warning"
              dispatch={subDispatch} message={message} 
              setStatus={setError}
            />
            <DividerBlank />
          </>
        )}
        {success && (
          <>
            <AlertMessage
              severity="success" title="Success"
              dispatch={subDispatch} message={message} 
              setStatus={setSuccess}
            />
            <DividerBlank />
          </>
        )}
        <form className={classes.form} 
          onSubmit={e => {
            e.preventDefault()
            setSubmit(true)
          }}
        >
          <TextField 
            required
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="Email" 
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.textFieldLabelRoot,
                focused: classes.textFieldLabelFocused,
              }
            }} 
            InputProps={{
              classes: {
                root: classes.textFieldInputRoot,
                focused: classes.textFieldInputFocused,
                notchedOutline: classes.textFieldInputNotchedOutline,
              }
            }} 
          />
          <Button type="submit" variant="contained" color="secondary" style={{color: theme.palette.common.white, borderRadius: 0}}>
            Subscribe
          </Button>
        </form>
      </section>
      <section className={classes.socialMedia}>
        <div className={classes.socialMediaWrap}>
          <div className={classes.logo}>
            <Link to="/" className={classes.socialLogo}>
              <CodeIcon style={{fontSize: 34, marginRight: '5px'}} />
              L<span style={{color: `#49beb7`}}>pN</span>b
            </Link>
          </div>
          <small className={classes.websiteRights}>LpNb @ {(new Date()).getFullYear()}. All Rights Reserved.</small>
          {userFooterPublic.socialMedias.length > 0 && (
            <div className={classes.socialIcons}>
              {userFooterPublic.socialMedias.map(socialMedia => (
                <a
                  key={socialMedia._id}
                  href={socialMedia.url} 
                  target="_blank"
                  // area-label={socialMedia.name}
                  className={classes.socialIconLink}
                >
                  {handleIcon2Display(socialMedia.icon.name)}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Footer

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.darken.main,
    padding: '4rem 0 2rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscription: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '1.5rem',
    padding: '1.5rem',
    color: theme.palette.common.white,
    '& > p': {
      fontFamily: `"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif`,
    }
  },
  subscriptionHeading: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
  },
  subscriptionText: {
    marginBottom: '1.5rem',
    fontSize: '1.25rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    }
  },
  textFieldLabelRoot: {
    color: theme.palette.secondary.main,
    '&$textFieldLabelFocused': {
      color: theme.palette.secondary.main
    },
  },
  textFieldLabelFocused: {},
  textFieldInputRoot: {
    color: theme.palette.common.white,
    borderRadius: 0,
    '&$textFieldInputFocused $textFieldInputNotchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
    '& $textFieldInputNotchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
    '&:hover $textFieldInputNotchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
  },
  textFieldInputFocused: {},
  textFieldInputNotchedOutline: {},
  links: {
    width: '100%',
    maxWidth: '62.5rem',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      paddingTop: '2rem',
    },
  },
  linkWrapper: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  linkItems: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '1rem',
    textAlign: 'left',
    width: '10rem',
    boxSizing: 'border-box',
    '& h2': {
      marginBottom: '1rem',
    },
    '& > h2': {
      color: theme.palette.common.white,
    },
    '& a': {
      color: theme.palette.common.white,
      textDecoration: 'none',
      marginBottom: '0.5rem',
      '&:hover': {
        color: theme.palette.lighten.dark,
        transition: theme.transitions.create(['all'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
    }
  },
  emailForm: {
    '& h2': {
      marginBottom: '2rem',
    }
  },
  /* Social Icons */
  socialIconLink: {
    color: theme.palette.common.white,
    fontSize: '1.5rem',
  },
  socialMedia: {
    maxWidth: '62.5rem',
    width: '100%',
  },
  socialMediaWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    maxWidth: '62.5rem',
    margin: '2.5rem auto 0 auto',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '15rem',
  },
  socialLogo: {
    color: theme.palette.common.white,
    justifySelf: 'felx-start',
    /* margin-left: 1.25rem; */
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '2rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  websiteRights: {
    color: theme.palette.common.white,
    marginBottom: '1rem',
  }
}))