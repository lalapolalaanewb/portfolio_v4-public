import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { FaTimes } from 'react-icons/fa'
import { Button, Checkbox, FormControl, Grid, Input, InputLabel, ListItemText, MenuItem, TextField, Tooltip, Typography, Select, Zoom } from '@material-ui/core'

const Contact = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [concerns, setConcerns] = useState([])
  const [message, setMessage] = useState('')
  const [submit, setSubmit] = useState(false)
  const [myEmailCopy, setMyEmailCopy] = useState('')
  const [myEmailRef, setMyEmailRef] = useState(null)

  // handle copy on click (for email)
  const handleCopy2Clipboard = () => {
    let range = document.createRange()
    range.selectNode(myEmailRef)
    window.getSelection().removeAllRanges() // clear current selection
    window.getSelection().addRange(range) // to select text
    document.execCommand("copy")
    window.getSelection().removeAllRanges()// to deselect
    setMyEmailCopy('Copied!')
    setTimeout(() => setMyEmailCopy(''), 4000)
  }

  // handle submit
  useEffect(() => {
    (async() => {
      if(submit) {
        // send the form
        console.log('Name: ' + name)
        console.log('Email: ' + email)
        console.log(concerns)
        console.log('Subject: ' + subject)
        console.log('Message: ' + message)
        setName('')
        setEmail('')
        setConcerns([])
        setSubject('')
        setMessage('')
        setSubmit(false)
      }
    })()
  }, [submit])

  return (
    <div className={classes.section}>
      <div className={classes.wrapper}>
        {/* {loading && <div className="lds-hourglass"></div>}
        {error && (
          <div className="error__container">
            <FaTimes size={20} className="error__btn" 
              onClick={() => setError(postsDispatch, {status: false, message: ''})} 
            />
            <p className="error__message message__break">{message}</p>
          </div>
        )} */}
        <form onSubmit={e => {
          e.preventDefault()
          setSubmit(true)
        }}>
          <Grid container spacing={2} className={classes.form}>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <TextField 
                    required
                    variant="outlined" 
                    label="Name" 
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    InputLabelProps={{
                      classes: {
                        root: classes.textFieldLabelRoot,
                        focused: classes.textFieldLabelFocused
                      }
                    }}
                    InputProps={{
                      classes: {
                        root: classes.textFieldRoot,
                        focused: classes.textFieldFocused,
                        notchedOutline: classes.textFieldNotchedOutline,
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <TextField 
                    required
                    variant="outlined" 
                    label="Email" 
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    InputLabelProps={{
                      classes: {
                        root: classes.textFieldLabelRoot,
                        focused: classes.textFieldLabelFocused
                      }
                    }}
                    InputProps={{
                      classes: {
                        root: classes.textFieldRoot,
                        focused: classes.textFieldFocused,
                        notchedOutline: classes.textFieldNotchedOutline,
                      }
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12}>
                <FormControl required variant="outlined" className={classes.formControl}>
                  <InputLabel 
                    id="concernLabel"
                    classes={{
                      root: classes.selectFieldLabelRoot,
                      focused: classes.selectFieldLabelFocused,
                      notchedOutline: classes.selectFieldLabelNotchedOutline,
                    }}
                  >
                    Concerns
                  </InputLabel>
                  <Select
                    labelId="concernLabel"
                    label="Concerns"
                    multiple
                    value={concerns}
                    onChange={e => setConcerns(e.target.value)}
                    // input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {['General', 'Hiring', 'Wordpress', 'Custom', 'Another'].map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={concerns.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField 
                    required
                    variant="outlined" 
                    label="Subject" 
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    InputLabelProps={{
                      classes: {
                        root: classes.textFieldLabelRoot,
                        focused: classes.textFieldLabelFocused
                      }
                    }}
                    InputProps={{
                      classes: {
                        root: classes.textFieldRoot,
                        focused: classes.textFieldFocused,
                        notchedOutline: classes.textFieldNotchedOutline,
                      }
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField
                    required
                    variant="outlined"
                    label="Message"
                    multiline
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    InputLabelProps={{
                      classes: {
                        root: classes.textFieldLabelRoot,
                        focused: classes.textFieldLabelFocused
                      }
                    }}
                    InputProps={{
                      classes: {
                        root: classes.textFieldRoot,
                        focused: classes.textFieldFocused,
                        notchedOutline: classes.textFieldNotchedOutline,
                      }
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <span className={classes.spanAccents}>***</span> Alternatively, you can email me at {' '}
                  <Tooltip TransitionComponent={Zoom} title={myEmailCopy ? myEmailCopy : 'Copy Email'} placement="top-end">
                    <span ref={e => setMyEmailRef(e)} onClick={() => handleCopy2Clipboard()} className={classes.spanAccents} style={{cursor: 'pointer', textDecoration: 'underline'}}>mohdfathi_mhdnoor@yahoo.com</span>
                  </Tooltip>
                </Typography>
                <Typography variant="body1">
                  <span className={classes.spanAccents}>***</span> Or you could also reach me on <a href="https://www.linkedin.com/in/mohamad-fathi-mhd-noor-100aa1147/" target="_blank" style={{color: theme.palette.secondary.main}}>LinkedIn</a>
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12}>
                <Button 
                  type="submit"
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  style={{width: '100%', color: theme.palette.common.white}}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  )
}

export default Contact

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

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
      paddingRight: 10,
      paddingLeft: 10,
    }
  },
  form: {
    maxWidth: 750,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formControl: {
    minWidth: '100%',
    maxWidth: '100%',
  },
  textFieldLabelRoot: {
    '&$textFieldLabelFocused': {
      color: theme.palette.secondary.main,
    }
  },
  textFieldLabelFocused: {},
  textFieldRoot: {
    '&$textFieldFocused $textFieldNotchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
  },
  textFieldFocused: {},
  textFieldNotchedOutline: {},
  spanAccents: {
    color: theme.palette.secondary.main
  },
  selectFieldLabelRoot: {
    '&$selectFieldLabelFocused': {
      color: theme.palette.secondary.main,
    },
  },
  selectFieldLabelFocused: {},
}))