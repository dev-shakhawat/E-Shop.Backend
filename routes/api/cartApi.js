const express = require('express');  
const cartRouter = express.Router();



const addToCart = require('../../controllers/cartControllers/addToCart');
const authMiddelware = require('../../middleware/authmiddleware');
const getCarts = require('../../controllers/cartControllers/getCarts');  
const updatecartQuantity = require('../../controllers/cartControllers/updateCart');
const deleteCart = require('../../controllers/cartControllers/deleteCart');

 

 

// add to cart
cartRouter.post('/addtocart' , authMiddelware , addToCart);


// get cart
cartRouter.get('/getcarts' , authMiddelware , getCarts);


// update cart
cartRouter.put('/updatecartQuantity' , authMiddelware , updatecartQuantity  );


// delete cart
cartRouter.delete('/deleteCart' , authMiddelware , deleteCart);
 



module.exports = cartRouter;