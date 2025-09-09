const express = require('express');  
const cartRouter = express.Router();



const addToCart = require('../../controllers/cartControllers/addToCart');
const authMiddelware = require('../../middleware/authmiddleware');

 

 

// add to cart
cartRouter.post('/addtocart' , authMiddelware , addToCart);
 



module.exports = cartRouter;