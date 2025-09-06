const express = require("express");
const productRouter = express.Router();

const addProduct = require("../../controllers/productControllers/addProduct");
const getProduct = require("../../controllers/productControllers/getProduct");
const upload = require("../../helpers/multer");
const getUserProducts = require("../../controllers/productControllers/getUsersProduct");
const authMiddelware = require("../../middleware/authmiddleware");
const deleteProduct = require("../../controllers/productControllers/deleteProduct");


// add product controller
productRouter.post("/add" , upload.single("thumbnail")  , addProduct);

productRouter.get("/all", getProduct);

// get user product
productRouter.get("/userProduct" , authMiddelware  , getUserProducts);

// delete product
productRouter.delete("/delete/:id" , authMiddelware , deleteProduct);




module.exports = productRouter;