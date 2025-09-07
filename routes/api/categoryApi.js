const express = require('express'); 

 
const categoryRouter = express.Router();


const addCategory = require('../../controllers/categoryControllers/add');
const getCategory = require('../../controllers/categoryControllers/getCategory');


categoryRouter.post('/addcategory' , addCategory);

categoryRouter.get('/getallcategory' , getCategory);



module.exports = categoryRouter;