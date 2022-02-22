import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from react-paypal-js

function CheckoutPage (){
    return (
    <div>
        <PayPalScriptProvider
        options={{"client-id":"insert here client id"}}>
            <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: "13.99",
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