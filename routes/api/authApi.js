const express = require('express'); 

const login = require('../../controllers/authControllers/loginController');
const registration = require('../../controllers/authControllers/registrationController');
const usernameCheck = require('../../controllers/authControllers/usernameController'); 
const mailverify = require('../../controllers/authControllers/mailVerify');
const sendOTP = require('../../controllers/authControllers/sendOTP');
const authMiddelware = require('../../middleware/authmiddleware');
const getUser = require('../../controllers/authControllers/getUser');
const updateProfile = require('../../controllers/authControllers/updateProfile');
const getUserMail = require('../../controllers/authControllers/getUserMail'); 

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


// update profile
authrouter.patch('/updateprofile/:id', authMiddelware , updateProfile );


//  get user mail
authrouter.get('/usermail/:id', getUserMail );


 




module.exports = authrouter;