const express = require('express');
const router = express.Router();
const authrouter = require('./api/authApi');
const productRouter = require('./api/productApi');
const categoryRouter  = require('./api/categoryApi');
const brandRouter = require('./api/brandApi');
const cartRouter = require('./api/cartApi');
const variantRouter = require('./api/variantApi');
const shippingRouter = require('./api/shippingApi');


 

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


// shipping route
router.use('/shipping' , shippingRouter);

 



module.exports = router;