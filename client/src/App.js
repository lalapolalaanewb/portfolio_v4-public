import React, { useState } from 'react'
import './App.css'
import { AuthState } from './contexts/Auth/AuthState'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { About, Contact, Home, Login, PolicyComment, Post, Posts, Projects, Resume } from './pages/public'
import { Dashboard, Medias, MediaSocials, Policies, PostsPrivate, Profile, ProjectsPrivate, SkillsPrivate, TechsPrivate, Users } from './pages/private'
import {
  UnprotectedRouteParentAbout,
  UnprotectedRouteParentHome,
  UnprotectedRouteParentPolicy,
  UnprotectedRouteParentPost,
  UnprotectedRouteParentPosts,
  UnprotectedRouteParentProjects,
  UnprotectedRouteParentResume,
} from './components/route/unprotected'
import {
  ProtectedRouteParentDashboard,
  ProtectedRouteParentLogin,
  ProtectedRouteParentMedias,
  ProtectedRouteParentMediaSocials,
  ProtectedRouteParentPolicies,
  ProtectedRouteParentPosts,
  ProtectedRouteParentProfile,
  ProtectedRouteParentProjects,
  ProtectedRouteParentSkills,
  ProtectedRouteParentTechs,
  ProtectedRouteParentUsers
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
              <UnprotectedRouteParentPosts exact path="/blog" component={Posts} />
              <UnprotectedRouteParentPost path="/blog/:id" component={Post} />
              <Route path="/contact" component={Contact} />
              <UnprotectedRouteParentPolicy path="/policy/comment" component={PolicyComment} />
              <UnprotectedRouteParentProjects exact path="/projects" component={Projects} />
              <UnprotectedRouteParentResume path="/resume" component={Resume} />
              <ProtectedRouteParentLogin exact path="/pfv4-admin" component={Login} />
              <ProtectedRouteParentMediaSocials exact path="/pfv4-admin/create/mediasocials" component={MediaSocials} />
              <ProtectedRouteParentPolicies exact path="/pfv4-admin/create/policies" component={Policies} />
              <ProtectedRouteParentSkills exact path="/pfv4-admin/create/skills" component={SkillsPrivate} />
              <ProtectedRouteParentTechs exact path="/pfv4-admin/create/techs" component={TechsPrivate} />
              <ProtectedRouteParentUsers exact path="/pfv4-admin/create/users" component={Users} />
              <ProtectedRouteParentDashboard exact path="/pfv4-admin/dashboard" component={Dashboard} />
              <ProtectedRouteParentMedias exact path="/pfv4-admin/medias" component={Medias} />
              <ProtectedRouteParentPosts exact path="/pfv4-admin/posts" component={PostsPrivate} />
              <ProtectedRouteParentProfile exact path="/pfv4-admin/profile" component={Profile} />
              <ProtectedRouteParentProjects exact path="/pfv4-admin/projects" component={ProjectsPrivate} />
              <Route path="*" component={() => "404 Not Found"} />
            </Switch>
          </Navbar>
        </ThemeProvider>
      </Router>
    </AuthState>
  );
}

export default App
