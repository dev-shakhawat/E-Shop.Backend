const express = require('express'); 

const login = require('../../controllers/authControllers/loginController');
const registration = require('../../controllers/authControllers/registrationController');
const usernameCheck = require('../../controllers/authControllers/usernameController'); 
const mailverify = require('../../controllers/authControllers/mailVerify');
const sendOTP = require('../../controllers/authControllers/sendOTP');

const authrouter = express.Router();


// login controller
authrouter.post('/login',  login );


// registration controller
authrouter.post('/register',  registration );


// username controller
authrouter.get('/checkusername',  usernameCheck );


// otp controller
authrouter.get('/otpsend/:id',   sendOTP);


// otp/email verify controller
authrouter.post('/mailverify/:id', mailverify  );





module.exports = authrouter;