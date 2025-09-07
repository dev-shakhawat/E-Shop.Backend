const express = require('express'); 
const addBrand = require('../../controllers/brandControllers/add');
const getBrand = require('../../controllers/brandControllers/getBrand');

 
const brandRouter = express.Router();

 


brandRouter.post('/addBrand' , addBrand);

brandRouter.get('/getallbrand' , getBrand);



module.exports = brandRouter;