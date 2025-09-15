const express = require("express"); 
const addPayment = require("../../controllers/paymentControllers/add");
const paymentSuccess = require("../../controllers/paymentControllers/success");
const paymentCanceled = require("../../controllers/paymentControllers/cancel");
const paymentFailed = require("../../controllers/paymentControllers/fail");
const authMiddelware = require("../../middleware/authmiddleware");
const paymentRouter = express.Router();

 


// add payment 
paymentRouter.post('/addPayment' , authMiddelware , addPayment);

 
//  success payment
paymentRouter.post('/success/:id' , paymentSuccess)


// payment canceled
paymentRouter.post('/cancel/:id' , paymentCanceled)


// payment failed
paymentRouter.post('/fail/:id' , paymentFailed)


module.exports = paymentRouter;