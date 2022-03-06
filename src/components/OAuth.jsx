import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, MicrosoftAuthProvider, GithubAuthProvider, TwitterAuthProvider} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'
import facebookIcon from '../assets/svg/facebookIcon.svg'
import microsoftIcon from '../assets/svg/microsoftIcon.svg'
import githubIcon from '../assets/svg/githubIcon.svg'
import twitterIcon from '../assets/svg/twitterIcon.svg'

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

 /* const onMicrosoftClick = async () => {
    try {
      const auth = getAuth()
      const provider = new MicrosoftAuthProvider()
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
  }*/

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
      <button className='socialIconDiv'>
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
      </tr>
      </table>
    </div>
  )
}

export default OAuth