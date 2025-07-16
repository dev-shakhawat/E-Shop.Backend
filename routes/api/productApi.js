const express = require("express");
const productRouter = express.Router();

const addProduct = require("../../controllers/productControllers/addProduct");
const getProduct = require("../../controllers/productControllers/getProduct");


// add product controller
productRouter.post("/add", addProduct);

productRouter.get("/all", getProduct);




module.exports = productRouter;