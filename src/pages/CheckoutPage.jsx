import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from react-paypal-js

function CheckoutPage (){
    return (
    <div>
        <PayPalScriptProvider
        options={{"client-id":"AUQQsoi73tMNDoF5eEdsHu8_uRfvum8GN3ZoBTUo5NLQkN_2mtrtd6XIDdDpyiEnDakDCBKY2Txl2m1m"}}>
            <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: listing.regularPrice,
                        },
                    },
                ],
            });
            }}
            onApprove={(data, action) => {
                return actions.order.capture().then(function (details){
                    alert ("Transaction completed by " + details.payer.name.give_name
                    );
                });
            }}
    />

        </PayPalScriptProvider>
    </div>
    );
}

export default CheckoutPage