import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, GithubAuthProvider, TwitterAuthProvider} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'
import facebookIcon from '../assets/svg/facebookIcon.svg'
import microsoftIcon from '../assets/svg/microsoftIcon.svg'
import githubIcon from '../assets/svg/githubIcon.svg'
import twitterIcon from '../assets/svg/twitterIcon.svg'
import yahooIcon from '../assets/svg/yahooIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with Google')
    }
  }

  const onFacebookClick = async () => {
    try {
      const auth = getAuth()
      const provider = new FacebookAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with Facebook')
    }
  }

 const onMicrosoftClick = async () => {
    try {
      const auth = getAuth()
      const provider = new OAuthProvider('microsoft.com')
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with Microsoft')
    }
  }

  const onGitHubClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GithubAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with GitHub')
    }
  }

  const onTwitterClick = async () => {
    try {
      const auth = getAuth()
      const provider = new TwitterAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with Twitter')
    }
  }

  const onYahooClick = async () => {
    try {
      const auth = getAuth()
      const provider = new OAuthProvider('yahoo.com')
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with Yahoo')
    }
  }

  //Apple requires to be part of their Apple Developer Program so this option won't be available.

  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
      <table>
    <tr>
      <th>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt='google' />
      </button>
      </th>
      <th>
      <button className='socialIconDiv' onClick={onFacebookClick}>
        <img className='socialIconImg' src={facebookIcon} alt='facebook' />
      </button>
      </th>
      <th>
      <button className='socialIconDiv' onClick={onMicrosoftClick}>
        <img className='socialIconImg' src={microsoftIcon} alt='microsoft' />
      </button></th>
      <th>
      <button className='socialIconDiv' onClick={onGitHubClick}>
        <img className='socialIconImg' src={githubIcon} alt='github' />
      </button></th>
      <th>
      <button className='socialIconDiv' onClick={onTwitterClick}>
        <img className='socialIconImg' src={twitterIcon} alt='twitter' />
      </button></th>
      <th>
      <button className='socialIconDiv' onClick={onYahooClick}>
        <img className='socialIconImg' src={yahooIcon} alt='yahoo' />
      </button></th>
      </tr>
      </table>
    </div>
  )
}

export default OAuth