import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import paypalIcon from '../assets/svg/paypalIcon.svg'
import stripeIcon from '../assets/svg/stripeIcon.svg'
import adyenIcon from '../assets/svg/adyenIcon.svg'
import braintreeIcon from '../assets/png/braintreeIcon.png'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [navigate, params.listingId])

  if (loading) {
    return <Spinner />
  }

  return (
    <main>
      <Helmet>
        <title>{listing.name}</title>
      </Helmet>
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'auto',
              }}
              className='swiperSlideDiv'
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='' />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

      <div className='listingDetails'>
        <p className='listingName'>
          {listing.name} - ???
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className='listingLocation'>{listing.location}</p>
        
               <p className='listingType'>
               For {listing.type === 'rent' ? 'Rent' : 'Sale'}
              </p>
        {listing.offer && (
          <p className='discountPrice'>
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className='listingDetailsList'>
          <li>
            {listing.quantity > 1
              ? `${listing.quantity} Quantity`
              : '1 Item'}
          </li>
          <li>
            {listing.year > 1
              ? `${listing.year} Year`
              : '2022'}
          </li>
          <li>{listing.sold && 'Item Sold?'}</li>
        </ul>

        <table>
          <thead><h2>Methods of Payments</h2>
        <tr>
        <th>Checkout with PayPal</th>
          <th><button className='socialIconDiv' onClick={event =>  window.location.href='/checkout-paypal'}>
        <img className='socialIconImg' src={paypalIcon} alt='Add To Cart' />
      </button> 
      </th>
        <th>Checkout with Braintree</th>
          <th><button className='socialIconDiv' onClick={event =>  window.location.href='/checkout-braintree'}>
        <img className='socialIconImg' src={braintreeIcon} alt='Add To Cart' />
      </button></th></tr><tr>
        <th>Checkout with Stripe</th>
          <th><button className='socialIconDiv' onClick={event =>  window.location.href='/checkout-stripe'}>
        <img className='socialIconImg' src={stripeIcon} alt='Add To Cart' />
      </button></th>
      <th>Checkout with Adyen</th>
          <th><button className='socialIconDiv' onClick={event =>  window.location.href='/checkout-adyen'}>
        <img className='socialIconImg' src={adyenIcon} alt='Add To Cart' />
      </button></th>
      </tr>
     </thead>
      </table>

        <p className='listingLocationTitle'>Location</p>

        <div className='leafletContainer'>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />

            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
            Contact Seller
          </Link>
        )}
      </div>
    </main>
  )
}

export default Listing

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat
