const express = require('express');
const router = express.Router();
const authrouter = require('./api/authApi');
const productRouter = require('./api/productApi');
const categoryRouter  = require('./api/categoryApi');
const brandRouter = require('./api/brandApi');
const cartRouter = require('./api/cartApi');
const variantRouter = require('./api/variantApi');


 

// auth router
router.use('/auth', authrouter);


// product router
router.use('/product', productRouter);


// category router
router.use('/category', categoryRouter);


// brand router
router.use('/brand', brandRouter);


// cart router
router.use('/cart', cartRouter);


// variant route
router.use('/variant' , variantRouter);

 



module.exports = router;