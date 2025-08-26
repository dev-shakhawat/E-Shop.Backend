const express = require('express'); 

const login = require('../../controllers/authControllers/loginController');
const registration = require('../../controllers/authControllers/registrationController');
const usernameCheck = require('../../controllers/authControllers/usernameController'); 
const mailverify = require('../../controllers/authControllers/mailVerify');
const sendOTP = require('../../controllers/authControllers/sendOTP');
const authMiddelware = require('../../middleware/authmiddleware');
const getUser = require('../../controllers/authControllers/getUser');

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


// get user data
authrouter.get('/userdata', authMiddelware , getUser );





module.exports = authrouter;