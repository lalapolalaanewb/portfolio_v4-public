import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { About, Contact, Home, Login, PolicyComment, Post, Posts, Projects, Resume } from './pages/public'
import {
  UnprotectedRouteParentAbout,
  UnprotectedRouteParentHome,
  UnprotectedRouteParentMail,
  UnprotectedRouteParentPolicy,
  UnprotectedRouteParentPost,
  UnprotectedRouteParentPosts,
  UnprotectedRouteParentProjects,
  UnprotectedRouteParentResume,
} from './components/route/unprotected'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Colors from './components/global/Colors'
import { getCookie, setCookie } from './services/Cookie'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const colors = {
    primary: {
      main: Colors.primary
    },
    secondary: {
      main: Colors.accents
    },
    error: {
      main: Colors.redAccents
    },
    warning: {
      main: Colors.yellowAccents
    },
    darken: {
      light: Colors.lessDark,
      main: Colors.darkPrimary,
      dark: Colors.dark
    },
    lighten: {
      light: Colors.extraLessWhite,
      main: Colors.lessWhite,
      dark: Colors.lightAccents
    }
  }

  const typography = {
    fontFamily: "'Montserrat', sans-serif",
  }

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      background: {
        default: Colors.primary,
        paper: Colors.darkPrimary
      },
      ...colors
    },
    typography: {
      ...typography
    }
  })

  const lightTheme = createMuiTheme({
    palette: {
      type: 'light',
      ...colors
    },
    typography: {
      ...typography
    }
  })

  /** theme mode default - function */
  useEffect(() => {
    (() => {
      let themeMode = getCookie('themeMode')
      if(themeMode) themeMode === 'light' ? setIsDarkMode(false) : setIsDarkMode(true)
      else setCookie('themeMode', 'light', { path: '/' })
    })()
  }, [])

  return (
    <Router>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
          <Switch>
            <UnprotectedRouteParentHome exact path="/" component={Home} />
            <UnprotectedRouteParentAbout path="/about" component={About} />
            <UnprotectedRouteParentPosts exact path="/blog" component={Posts} />
            <UnprotectedRouteParentPost path="/blog/:id" component={Post} />
            <UnprotectedRouteParentMail path="/contact" component={Contact} />
            <UnprotectedRouteParentPolicy path="/policy/comment" component={PolicyComment} />
            <UnprotectedRouteParentProjects exact path="/projects" component={Projects} />
            <UnprotectedRouteParentResume path="/resume" component={Resume} />
            <Route path="*" component={() => "404 Not Found"} />
          </Switch>
        </Navbar>
      </ThemeProvider>
    </Router>
  );
}

export default App
