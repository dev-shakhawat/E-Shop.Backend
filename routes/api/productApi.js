const express = require("express");
const productRouter = express.Router();

const addProduct = require("../../controllers/productControllers/addProduct");


// add product controller
productRouter.post("/add", addProduct);




module.exports = productRouter;