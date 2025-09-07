const express = require("express");
const productRouter = express.Router();

const addProduct = require("../../controllers/productControllers/addProduct");
const getProduct = require("../../controllers/productControllers/getProduct");
const upload = require("../../helpers/multer");
const getUserProducts = require("../../controllers/productControllers/getUsersProduct");
const authMiddelware = require("../../middleware/authmiddleware");
const deleteProduct = require("../../controllers/productControllers/deleteProduct");
const getFeaturedProduct = require("../../controllers/productControllers/getFeaturedProduct");
const getNewArrival = require("../../controllers/productControllers/getNewArrival");


// add product controller
productRouter.post("/add" , upload.single("thumbnail")  , addProduct);

productRouter.get("/all/filter", getProduct);

// get user product
productRouter.get("/userProduct" , authMiddelware  , getUserProducts);

// delete product
productRouter.delete("/delete/:id" , authMiddelware , deleteProduct);


// get featured product
productRouter.get("/featured" , getFeaturedProduct);


// get new arrival product
productRouter.get("/newArrival" , getNewArrival);




module.exports = productRouter;