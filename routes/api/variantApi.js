const express = require('express');  
const addVariant = require('../../controllers/variantControllers.js/add');
const upload = require('../../helpers/multer');
const variantRouter = express.Router();




//  add variant 
variantRouter.post('/addVariant' , upload.array("images" , 20) , addVariant);
 
 



module.exports = variantRouter;