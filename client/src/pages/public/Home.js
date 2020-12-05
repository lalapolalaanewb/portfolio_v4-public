import React, { useEffect } from 'react'
import { useUser } from '../../contexts/User/Public/UserState'
import { setLoading, setError, getUserOnHome } from '../../contexts/User/Public/UserAction'
import { Section } from '../../components/Home/Section'
import { FaTimes } from 'react-icons/fa'

const Home = () => {
  const [userState, userDispatch] = useUser()
  const { userHome, loading, error, message } = userState

  // user get data - function
  useEffect(() => {
    (async() => {
      await getUserOnHome(userDispatch)

      setLoading(userDispatch, false)
    })()
  }, [])

  return (
    <>
      {loading && <div className="lds-hourglass accents-ver"></div>}
      {error && (
        <div className="error__container">
          <FaTimes size={20} className="error__btn" 
            onClick={() => setError(userDispatch, {status: false, message: ''})} 
          />
          <p className="error__message message__break">{message}</p>
        </div>
      )}
      <Section homes={userHome.homes} />
    </>
  )
}

export default Home