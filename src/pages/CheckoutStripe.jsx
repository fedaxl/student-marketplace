import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51Kd0SWGQMXnbID09kGA0Gf94K4NbbqrDosONCzsEzFUaDIBg1vwRpej657zS5tHOVl3ZGMeZtzhtUrF6cMsjxqb500F9TGAP22");

const successMessage = () => {
  return (
    <div className="success-msg">
      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
      </svg>
      <div className="title">Payment Successful</div>
    </div>
  )
}

const cart = () => {
  return (<React.Fragment>
    <h4 className="d-flex justify-content-between align-items-center mb-3">
      <span className="text-muted">Your cart</span></h4>
        <span>Total €</span>
        <strong>10.00</strong>
  </React.Fragment>)
}

function StripeCheckout() {
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  return (
    <div className="container">
      <div className="py-5 text-center">
        <h4>Stripe Integration</h4>
      </div>

      <div className="row s-box">
        {paymentCompleted ? successMessage() : <React.Fragment>
          <div className="col-md-5 order-md-2 mb-4">
            {cart()}
          </div>
          <div className="col-md-7 order-md-1">
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={10.00} setPaymentCompleted={setPaymentCompleted} />
            </Elements>
          </div>
        </React.Fragment>}
      </div>

    </div>
  );
}

export default StripeCheckout;