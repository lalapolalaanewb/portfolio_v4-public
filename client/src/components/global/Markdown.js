import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { twilight, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const Markdown = ({ language, value }) => {
  const theme = useTheme()

  return (
    <SyntaxHighlighter 
      language={language}
      showLineNumbers={true} 
      style={theme.palette.type === 'light' ? vscDarkPlus : twilight}
      
    >
      {value === undefined ? '' : value}
    </SyntaxHighlighter>
  )
}

export default Markdown

export const MarkDownStyles = () => {
  const classes = useStyles()

  return { markdownStyles: classes }
}

const useStyles = makeStyles(theme => ({
  mdContainer: {
    '& code': {
      fontSize: '12px',
      fontWeight: 200,
      padding: '2px 5px',
      borderRadius: '5px',
    },
    '& a:link, a:visited': {
      color: theme.palette.secondary.main,
      '&:hover': {
        fontWeight: 500
      }
    },
  },
  mdContainerLight: {
    '& code': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.lighten.light,
    }
  },
  mdContainerDark: {
    '& code': {
      // backgroundColor: theme.palette.grey[200],
      color: theme.palette.common.white,
      backgroundColor: 'rgb(30,30,30)',
    }
  }
}))