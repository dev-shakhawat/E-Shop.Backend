const express = require('express');
const router = express.Router();
const authrouter = require('./api/authApi');
const productRouter = require('./api/productApi');
const categoryRouter  = require('./api/categoryApi');
const brandRouter = require('./api/brandApi');


 

// auth router
router.use('/auth', authrouter);


// product router
router.use('/product', productRouter);


// category router
router.use('/category', categoryRouter);



// brand router
router.use('/brand', brandRouter);

 



module.exports = router;