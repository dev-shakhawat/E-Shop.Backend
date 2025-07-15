const express = require('express');
const router = express.Router();
const authrouter = require('./api/authApi');


router.use('/auth', authrouter);

 



module.exports = router;