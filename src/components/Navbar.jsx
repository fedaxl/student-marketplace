import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'

function Navbar() {
  const [displayName, setDisplayName] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  const auth = getAuth()
  // const user = auth.currentUser;
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setDisplayName('Hey ' + user.displayName + '!')
      console.log('Display = ' + displayName)
    } else {
      setDisplayName('Login')
    }
  })
  

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  return (
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem' onClick={() => navigate('/')}>
            <ExploreIcon
              fill={pathMatchRoute('/') ? '#f03264' : '#ffffff'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              HomePage
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/offers')}>
            <OfferIcon
              fill={pathMatchRoute('/offers') ? '#f03264' : '#ffffff'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/offer')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Offers
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/profile')}>
            <PersonOutlineIcon
              fill={pathMatchRoute('/profile') ? '#f03264' : '#ffffff'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/profile')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            > 
            {displayName && (<span>{displayName}</span>)}
            </p>
            
          </li>
        </ul>
      </nav>
  )
}

export default Navbar