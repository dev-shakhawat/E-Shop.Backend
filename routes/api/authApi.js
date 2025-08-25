const express = require('express'); 

const login = require('../../controllers/authControllers/loginController');
const registration = require('../../controllers/authControllers/registrationController');
const usernameCheck = require('../../controllers/authControllers/usernameController');
const numberVerify = require('../../controllers/authControllers/numberVerify');
const otpCheck = require('../../controllers/authControllers/optCheck');

const authrouter = express.Router();


// login controller
authrouter.post('/login',  login );


// registration controller
authrouter.post('/register',  registration );


// username controller
authrouter.get('/checkusername',  usernameCheck );


// otp controller
authrouter.get('/checkpoint',   otpCheck);





module.exports = authrouter;