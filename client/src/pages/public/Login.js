import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { isLogin, setError, setLoading } from '../../contexts/Auth/AuthAction'
import { useAuth } from '../../contexts/Auth/AuthState'
import { FaTimes } from 'react-icons/fa'
import { Button } from '../../components/global/Button'
import '../../components/Login/Login.css'

const Login = () => {
  const [authState, authDispatch] = useAuth()
  const { authenticated, error, message, loading } = authState
  
  // section bg color
  const [lightBg] = useState(true)

  // page specific states & functions
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submit, setSubmit] = useState(false)
  const history = useHistory()

  // for user login
  useEffect(() => {
    if(submit) {
      (async() => {
        await isLogin(authDispatch, { email: username, password: password })

        setLoading(authDispatch, false)
        // history.push('/pfv4-admin/dashboard')
      })();

      // empty out placeholders
      setPassword('')
      
      setSubmit(false)
    }
  }, [submit])

  return (
    <>
      <div className={lightBg ? 'login__section' : 'login__section darkBg'}>
        <div className="login__wrapper">
          {loading && <div className="lds-hourglass"></div>}
          {error && (
            <div className="error__container">
              <FaTimes size={20} className="error__btn" 
                onClick={() => setError(authDispatch, {error: false, message: ''})} 
              />
              <p className="error__message message__break">{message}</p>
            </div>
          )}
          <div className="inputs__container">
            <form className="input__form" 
              onSubmit={(e) => {
                e.preventDefault()
                setSubmit(true)
              }}
            >
              <div className="form__group">
                <label className={lightBg ? 'form__label' : 'form__label darkLabel'}>Username</label>
                <input type="email" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  className={lightBg ? 'form__inputfield' : 'form__inputfield darkInputfield'}
                  required
                />
              </div>
              <div className="form__group">
                <label className={lightBg ? 'form__label' : 'form__label darkLabel'}>Password</label>
                <input type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className={lightBg ? 'form__inputfield' : 'form__inputfield darkInputfield'}
                  required
                />
              </div>
              {lightBg ? (
                <Button buttonSize="btn--wide">Login</Button>
              ) : (
                <Button buttonSize="btn--wide" buttonColor="accents">Login</Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login