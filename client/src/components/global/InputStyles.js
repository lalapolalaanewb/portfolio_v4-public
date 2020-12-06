import { makeStyles } from '@material-ui/core/styles'

const InputStyles = () => {
  const classes = useStyles()

  return { inputClasses: classes }
}

export default InputStyles

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formControl: {
    maxWidth: '100%',
  },
  textFieldLabel: {
    '&:hover': {
      color: theme.palette.secondary.main
    },
    '&$textFieldLabelFocused': {
      color: theme.palette.secondary.main
    },
  },
  textFieldLabelFocused: {},
  textFieldRoot: {
    // '&:hover $textFieldNotchedOutline': {
    //   borderColor: theme.palette.secondary.main
    // },
    '&$textFieldFocused $textFieldNotchedOutline': {
      borderColor: theme.palette.secondary.main
    },
  },
  textFieldFocused: {},
  textFieldNotchedOutline: {},
  selectFieldLabelRoot: {
    '&$selectFieldLabelFocused': {
      color: theme.palette.secondary.main,
    },
  },
  selectFieldLabelFocused: {},
  ctaCancel: {
    backgroundColor: theme.palette.error.main,
    marginRight: '1rem'
  },
  ctaReset: {
    backgroundColor: theme.palette.warning.main,
    marginRight: '1rem'
  },
  formBtns: {
    color: theme.palette.common.white,
    marginTop: 20
  },
}))