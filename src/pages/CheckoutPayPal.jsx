import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'


function CheckoutPage (){
    return (
    <div>
         <header>
        <p className='pageHeader'>Checkout with PayPal</p>
      </header>
        <main>
        <PayPalScriptProvider
        options={{"client-id":"AUQQsoi73tMNDoF5eEdsHu8_uRfvum8GN3ZoBTUo5NLQkN_2mtrtd6XIDdDpyiEnDakDCBKY2Txl2m1m"}}>
            <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: 10.00,
                        },
                    },
                ],
            });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then(function (details){
                    alert ("Transaction completed! ID: " + details.id);
                    console.log(details);
                });
            }}
    />
        </PayPalScriptProvider>        
        </main>
    </div>
    );
}

export default CheckoutPage