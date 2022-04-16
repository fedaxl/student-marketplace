import React, { Component } from 'react';
import paymentMethodsSample from '../paymentMethodsSample.json';

//const MERCHANT_ACCOUNT = process.env.MERCHANT_ACCOUNT;
const API_KEY = 'pub.v2.8016473447373239.aHR0cDovL2xvY2FsaG9zdDozMDAw.KiWmctbaLhycxuZOHzPH3Z7oEHrbhDAPEueD76AAr4s';
//const API_KEY = 'pub.v2.8016473447373239.aHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMA.KAYPK_Ae_1q_A5cGt2mMZCQA38tPyf2ksmD0urUf2Ag';

class AdyenCheckout extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.state = {
      paymentMethods: [],
      isLoading: true
    };
    this.initAdyenCheckout = this.initAdyenCheckout.bind(this);
  }

  getPaymentMethods() {
    fetch('/paymentMethods', {
       //method: 'GET',
       //body: JSON.stringify({
       //  "merchantAccount": MERCHANT_ACCOUNT,
       //  "countryCode": "IE",
        // "shopperLocale": "en-US",
        // "amount": {
        // "currency": "EUR",
         //  "value": 10.00
      //  }
      // })
    }
    )
      .then((response) => response.json())
      .then((json) => { 
        this.setState({ response: json.paymentMethods });
      })
      .catch((error) => console.error(error));
  }

  componentDidMount() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.7.0/adyen.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.7.0/adyen.js';
    script.async = true;
    script.onload = this.initAdyenCheckout; // Wait until the script is loaded before initiating AdyenCheckout
    document.body.appendChild(script);
  }

  initAdyenCheckout() {
    const configuration = {
      locale: 'en-US',
      environment: 'test',
      originKey: API_KEY,
      paymentMethodsResponse: paymentMethodsSample,
      amount: {
        value: 10.00,
        currency: "EUR"
      }
    };
    
    const state = {
      isValid: true,
      data: {
        paymentMethod: {
          type: "scheme",
          encryptedCardNumber: "adyenjs_0_1_18$k7s65M5V0KdPxTErhBIPoMPI8HlC..",
          encryptedExpiryMonth: "adyenjs_0_1_18$p2OZxW2XmwAA8C1Avxm3G9UB6e4..",
          encryptedExpiryYear: "adyenjs_0_1_18$CkCOLYZsdqpxGjrALWHj3QoGHqe+..",
          encryptedSecurityCode: "adyenjs_0_1_18$XUyMJyHebrra/TpSda9fha978+..",
          holderName: "S. Hopper"
        }
      }
    };

    const checkout = new window.AdyenCheckout(configuration);

    checkout
      .create("dropin", {
        onSubmit: (state, dropin) => {
          dropin.setStatus("loading");
          // makePaymentCall(state.data).then...
        },
        onAdditionalDetails: (state, dropin) => {
          // makeDetailsCall(state.data).then...
        }
      })
      .mount('#dropin-container');
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">Adyen Checkout</header>

        <div className="paymentMethods">
          <button onClick={this.getPaymentMethods}> Get Payment Methods </button>
        </div>

        <div id="dropin-container"/></div>
    )
  }
}

export default AdyenCheckout;