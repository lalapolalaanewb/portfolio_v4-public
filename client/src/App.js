import React, { useState } from 'react'
import './App.css'
import { AuthState } from './contexts/Auth/AuthState'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { Home, About, Resume, Projects, Posts, Post, Contact, Login } from './pages/public'
import { Profile, Dashboard, ProjectsPrivate, PostsPrivate, Users, MediaSocials, SkillsPrivate, TechsPrivate } from './pages/private'
import {
  UnprotectedRouteParentHome,
  UnprotectedRouteParentAbout,
  UnprotectedRouteParentResume,
  UnprotectedRouteParentProjects,
  UnprotectedRouteParentPosts,
  UnprotectedRouteParentPost
} from './components/route/unprotected'
import {
  ProtectedRouteParentLogin,
  ProtectedRouteParentProfile,
  ProtectedRouteParentDashboard,
  ProtectedRouteParentProjects,
  ProtectedRouteParentPosts,
  ProtectedRouteParentUsers,
  ProtectedRouteParentMediaSocials,
  ProtectedRouteParentSkills,
  ProtectedRouteParentTechs
} from './components/route/protected'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Colors from './components/global/Colors'

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

  return (
    <AuthState>
      <Router>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
            <Switch>
              <UnprotectedRouteParentHome exact path="/" component={Home} />
              <UnprotectedRouteParentAbout path="/about" component={About} />
              <UnprotectedRouteParentResume path="/resume" component={Resume} />
              <UnprotectedRouteParentProjects exact path="/projects" component={Projects} />
              <UnprotectedRouteParentPosts exact path="/blog" component={Posts} />
              <UnprotectedRouteParentPost path="/blog/:id" component={Post} />
              <Route path="/contact" component={Contact} />
              <ProtectedRouteParentLogin exact path="/pfv4-admin" component={Login} />
              <ProtectedRouteParentProfile exact path="/pfv4-admin/profile" component={Profile} />
              <ProtectedRouteParentDashboard exact path="/pfv4-admin/dashboard" component={Dashboard} />
              <ProtectedRouteParentProjects exact path="/pfv4-admin/projects" component={ProjectsPrivate} />
              <ProtectedRouteParentPosts exact path="/pfv4-admin/posts" component={PostsPrivate} />
              <ProtectedRouteParentUsers exact path="/pfv4-admin/create/users" component={Users} />
              <ProtectedRouteParentMediaSocials exact path="/pfv4-admin/create/mediasocials" component={MediaSocials} />
              <ProtectedRouteParentSkills exact path="/pfv4-admin/create/skills" component={SkillsPrivate} />
              <ProtectedRouteParentTechs exact path="/pfv4-admin/create/techs" component={TechsPrivate} />
              <Route path="*" component={() => "404 Not Found"} />
            </Switch>
          </Navbar>
        </ThemeProvider>
      </Router>
    </AuthState>
  );
}

export default App
