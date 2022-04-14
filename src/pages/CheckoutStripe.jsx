import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../components/CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51Kd0SWGQMXnbID09kGA0Gf94K4NbbqrDosONCzsEzFUaDIBg1vwRpej657zS5tHOVl3ZGMeZtzhtUrF6cMsjxqb500F9TGAP22");

function StripeCheckout() {
  return (
    <div className="App">
      {/* Elements is the provider that lets us access the Stripe object. 
         It takes the promise that is returned from loadStripe*/}
      <Elements stripe={stripePromise}>
        <CheckoutForm /> 
      </Elements>
    </div>
  );
}

export default StripeCheckout;