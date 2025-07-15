const express = require('express'); 

const login = require('../../controllers/authControllers/loginController');
const registration = require('../../controllers/authControllers/registrationController');
const usernameCheck = require('../../controllers/authControllers/usernameController');

const authrouter = express.Router();


// login controller
authrouter.get('/login',  login );


// registration controller
authrouter.post('/register',  registration );


// username controller
authrouter.get('/checkusername',  usernameCheck );





module.exports = authrouter;