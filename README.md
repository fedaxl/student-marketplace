# $marketplace - Login and Pay

$marketplace is a web platform that allows students to sell, rent, or buy items online.
It is a mobile-responsive platform and it was built using React.js, a Node.js server and Firebase for storing data and use functions.
Rather than focus on selling and purchasing items, this project was about researching new methods for user authentication and payment methods available in Ireland.
Users can either create their own account or choose from six alternative OAuth methods. Using $Marketplace's checkout system, you can use the most popular methods of payment at the time of the college project.

### Screenshots
![Presentation](https://user-images.githubusercontent.com/22814086/163734615-b85f3049-c287-414a-bfd7-3af99777e9ec.jpg)

## Firebase and Sign-In providers
Create your app at https://console.firebase.google.com/ > go to Authentication > Sign-In method > Add new provider (you will have to create a set of credentials which each individual provider)
![Firebase_Authentication](https://user-images.githubusercontent.com/22814086/163734922-3329cdac-3f15-4d8f-b6f3-f042fa68fe08.jpg)

Configure the Firestore Database for storing and managing your "listings" and "users" collections. 

## Methods of payment

For this project, I have attempted to integrate PayPal, Stripe, Braintree Drop-In and Adyen methods of payment, which are currently the most common options available in Ireland at the time of this project. 
You will have to register and retrieve your API credentials with each providers. 
For this project all the integrations are running in test/sandbox environment. 

## Deployment on Heroku

This project has been deployed using Git (from terminal: git push heroku master) to Heroku: https://s-marketplace.herokuapp.com/

Buildpacks:
https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz
and heroku/nodejs

Don't forget to configure your env variables!

### Running on Localhost: 

Use `npm start` to run the app locally, [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.
Use `node server.js` to start the server on port 4242.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


