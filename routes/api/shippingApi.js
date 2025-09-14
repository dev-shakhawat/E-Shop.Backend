const express = require("express");
const addShipping = require("../../controllers/shippingControllers/add");
const authMiddelware = require("../../middleware/authmiddleware");
const shippingRouter = express.Router();

 





// add shipping
shippingRouter.post('/addshipping' , authMiddelware , addShipping);
 


module.exports = shippingRouter;