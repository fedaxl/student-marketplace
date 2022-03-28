var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
 
const stripe = require('stripe')('sk_test_51Kd0SWGQMXnbID09dzc2hKp5QzeM871KOKgDGa6OkP87QWrwm6ZmhPtsMoPNX1YHfnSkL7fHNdXGcNlMR7gXWpt400T9xf1fwp');
 
const braintree = require("braintree");

var app = express();
var port = process.env.PORT || 4000;
 
// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
// confirm the paymentIntent Stripe
app.post('/pay', async (request, response) => {
  try {
    // Create the PaymentIntent Stripe
    let intent = await stripe.paymentIntents.create({
      payment_method: request.body.payment_method_id,
      description: "Test payment",
      amount: request.body.amount * 10.00,
      currency: 'eur',
      confirmation_method: 'manual',
      confirm: true
    });
    // Send the response to the client
    response.send(generateResponse(intent));
  } catch (e) {
    // Display error on client
    return response.send({ error: e.message });
  }
});

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  // Use your own credentials from the sandbox Control Panel here
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY,
});

//braintree
app.post("/confirmBraintree", (req, res) => {
  try {
    // Use the payment method nonce here
    var nonceFromTheClient = req.body.paymentMethodNonce;
    // Create a new transaction for $10
    var newTransaction = gateway.transaction.sale(
      {
        amount: "10.00",
        paymentMethodNonce: nonceFromTheClient,
        options: {
          // This option requests the funds from the transaction once it has been
          // authorized successfully
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          res.send(result);
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    // Deal with an error
    console.log(err);
    res.send(err);
  }
});
 
const generateResponse = (intent) => {
  if (intent.status === 'succeeded') {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    return {
      success: true
    };
  } else {
    // Invalid status
    return {
      error: 'Invalid PaymentIntent status'
    };
  }
};
 
// request handlers
app.get('/', (req, res) => {
  res.send('Stripe Integration!');
});

    
module.exports = function (app) {
  app.get("/braintree", function (req, res) {
    res.send("Braintree route is healthy");
  });
 
app.listen(port, () => {
  console.log('Server started on: ' + port);
});
};