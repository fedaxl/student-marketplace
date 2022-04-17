import React, {useEffect, useState} from 'react'
import './index.css';
import dropin from "braintree-web-drop-in"
import {Button} from "reactstrap";
import axios from "axios";

function BraintreeDropIn(props) {
    const { show, onPaymentCompleted } = props;

    const [braintreeInstance, setBraintreeInstance] = useState(undefined)

    useEffect(() => {
        if (show) {
            const initializeBraintree = () => dropin.create({
                authorization: "sandbox_6mz8fjhx_8z6h82ttn4yn8mjt", // insert your tokenization key or client token here
                container: '#braintree-drop-in-div',
            }, function (error, instance) {
                if (error)
                    console.error(error)
                else
                    setBraintreeInstance(instance);
            });

            if (braintreeInstance) {
                braintreeInstance
                    .teardown()
                    .then(() => {
                        initializeBraintree();
                    });
            } else {
                initializeBraintree();
            } 
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

      

    return (
        <div
            style={{display: `${show ? "block" : "none"}`}}
        >
            <div
                id={"braintree-drop-in-div"}
            />

            <Button
                className={"braintreePayButton"}
                type="primary"
                disabled={!braintreeInstance}
                onClick={() => {
                    if (braintreeInstance) {
                        braintreeInstance.requestPaymentMethod(
                            (error, payload) => {
                                if (error) {
                                    console.error(error);
                                } else {
                                    const paymentMethodNonce = payload.nonce;
                                    console.log("payment method nonce", payload.nonce);

                                    // TODO: use the paymentMethodNonce to
                                    //  call you server and complete the payment here
                                    axios.post("/confirmBraintree/", {
                                        amount: "10.00",
                                        paymentMethodNonce: paymentMethodNonce,
                                            options: {
          // This option requests the funds from the transaction once it has been
          // authorized successfully
                                             submitForSettlement: true,
        }})
        .then((result) => {
          alert("Your payment was successful");
        })
        .catch((error) => {
          console.log(error);
        });
                      
        //alert(`Payment completed with nonce=${paymentMethodNonce}`);

            onPaymentCompleted(
                                     alert(`Payment completed for nonce=${paymentMethodNonce}`)
                                   );
            
                                }
                            });
                    }
                }}
            >
                {
                    "Pay"
                }
            </Button>
        </div>
    )
}

export default BraintreeDropIn