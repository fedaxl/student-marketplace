import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage'
import Offers from './pages/OffersPage'
import Category from './pages/Category'
import Profile from './pages/ProfilePage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import Listing from './pages/ListingPage'
import Contact from './pages/ContactPage'
import CheckoutPage from './pages/CheckoutPayPal'
import BraintreeCheckout from './pages/CheckoutBraintree'
import StripeCheckout from './pages/CheckoutStripe'
import AdyenCheckout from './pages/CheckoutAdyen'
 
function App() {

  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/edit-listing/:listingId' element={<EditListing />} />
          <Route path='/checkout-paypal' element={<CheckoutPage />} />
          <Route path='/checkout-braintree' element={<BraintreeCheckout/>} />
          <Route path='/checkout-stripe' element={<StripeCheckout/>} />
          <Route path='/checkout-adyen' element={<AdyenCheckout/>} />
          <Route
            path='/category/:categoryName/:listingId'
            element={<Listing />}
          />
          <Route path='/contact/:sellerdId' element={<Contact />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App