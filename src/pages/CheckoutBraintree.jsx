import React, {useState} from 'react'
import BraintreeDropIn from "../components/BraintreeDropIn";
import {Container, Button} from "reactstrap";

function BraintreeCheckout() {
    const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false);

    return (
        <div>
        <Container>
                        <Button
                            onClick={() => {
                            setShowBraintreeDropIn(true)}}
                            disabled={showBraintreeDropIn}
                        >
                            {
                                "Go to Checkout"
                            }
                        </Button>
            <BraintreeDropIn
                show={showBraintreeDropIn}
                onPaymentCompleted={() => {
                    setShowBraintreeDropIn(false);
                }}
            />
        </Container>
        </div>
    );
}

export default BraintreeCheckout