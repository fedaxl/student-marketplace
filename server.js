var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const inventoryData = require('.\inventory.json');
const jquery = require("jquery");
const { Client, Config, CheckoutAPI } = require("@adyen/api-library");
const { json } = require("body-parser");
 
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
  merchantId: '8z6h82ttn4yn8mjt',
  publicKey:'jxy9mggnbwztphfk',
  privateKey: '13840801b0334b9a91b32ae8932c0344',
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




// // import Credentials from environment variables
// const {
//     env: { ADYEN_API_KEY },
// } = process;

// Create Adyen API Client instance
const client = new Client({
  apiKey: 'test_KYCTRPKW5ZANPBUF7NZCEGDPMY372HX6',
  environment: "TEST",
});
// Configure Adyen Client
const config = new Config();
config.apiKey = 'AQErhmfuXNWTK0Qc+iSWl2A9te2YSa1EAoFPVn9XTJLP/D7ozP7co5NmlNiBfxDBXVsNvuR83LVYjEgiTGAH-6IyjB9YxNkwKcjFnff0lbIHGmljxBx9cKGhAUfzuans=-tqMMf6K_U9]mdrDw';
config.merchantAccount = 'FedericaFiorenzaECOM';
config.publicKey = '10001|B54B35692FFACF2E90B5B75387F506FE0891E58A87A428A34F1ABA0B4A68597F4B0CDAFEC6D5F9830E03E136058A0611F54410E13E8B104E9B232AD21F182A6753E88CDA031075149CE190174423E654206EFE2E62A274E26F66ECB203EFAACC2BDA332F62508BBBA8ECD1F5383ED1EBFE4798A9539E06ADB1AE969C47DA5D7621D6370845918DE38A935DE609C47BDD5B956E91297245EAEB6B0C3DED5C90E65E28CEA2817BAE8CC7AF613318911A7D7DDA409B5939E9F3F9CA7CB0375D4B2E5E81433FA9BB0774E2F559C5C61CAFF339052906D4F07CA7CD98069936239E1B68FDD2AB58290C63D8D7631852684447DCAC34DF1E3B8D6C20C1256D31E2CD9F';
client.setEnvironment("TEST");

 
app.listen(port, () => {
  console.log('Server started on: ' + port);
});
};