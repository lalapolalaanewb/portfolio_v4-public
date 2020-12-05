import React, { useState } from 'react'
import { setError } from '../../contexts/Auth/AuthAction'
import { useAuth } from '../../contexts/Auth/AuthState'
import Headline from '../../components/global/Headline'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import '../../components/Dashboard/Dashboard.css'
import { AiFillProject } from 'react-icons/ai'
import { BsFilePost } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

const Dashboard = () => {
  const [authState, authDispatch] = useAuth()
  const { error, message, loading } = authState

  /** theme - states */
  const classes = useStyles()
  const theme = useTheme()

  // page specific states and functions
  const [lightBg] = useState(true)

  return (
    <>
      <Headline headline="Dashboard" subHeadline="Representation" />
      <div style={{ border: '1px solid red', width: '100%' }}>
        
      </div>
      {/* <div className={lightBg ? 'dashboard__section': 'dashboard__section darkBg'}>
        <div className="dashboard__wrapper">
          {loading && <div className="lds-hourglass"></div>}
          {error && (
            <div className="error__container">
              <FaTimes size={20} className="error__btn" 
                onClick={() => setError(authDispatch, {error: false, message: ''})} 
              />
              <p className="error__message message__break">{message}</p>
            </div>
          )}
          <div className="dashboard__container">
            <div className="card__container">
              <div className={lightBg ? 'card__layout' : 'card__layout darkCardLayout'}>
                <div className={lightBg ? 'card__icon' : 'card__icon darkCardIcon'}>
                  <BsFilePost size={84} style={{fill: '#fff'}} />
                </div>
                <div className="card__info">
                  <h1 className={lightBg ? 'card__title' : 'card__title darkColor'}>Projects</h1>
                  <p className={lightBg ? 'card__counter' : 'card__counter darkColor'}>16</p>
                </div>
              </div>
              <div className={lightBg ? 'card__layout' : 'card__layout darkCardLayout'}>
                <div className={lightBg ? 'card__icon' : 'card__icon darkCardIcon'}>
                  <AiFillProject size={84} style={{fill: '#fff'}} />
                </div>
                <div className="card__info">
                  <h1 className={lightBg ? 'card__title' : 'card__title darkColor'}>Blogs</h1>
                  <p className={lightBg ? 'card__counter' : 'card__counter darkColor'}>16</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Dashboard

const useStyles = makeStyles(theme => ({}))