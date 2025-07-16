const express = require('express');
const router = express.Router();
const authrouter = require('./api/authApi');
const productRouter = require('./api/productApi');


// auth router
router.use('/auth', authrouter);


// product router
router.use('/product', productRouter);

 



module.exports = router;