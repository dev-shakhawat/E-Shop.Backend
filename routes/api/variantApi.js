const express = require('express');  
const addVariant = require('../../controllers/variantControllers.js/add');
const upload = require('../../helpers/multer');
const deleteVariant = require('../../controllers/variantControllers.js/delete');
const variantRouter = express.Router();




//  add variant 
variantRouter.post('/addVariant' , upload.array("images" , 20) , addVariant);


// delete variant
variantRouter.delete('/delete/:id' ,  deleteVariant);



 
 



module.exports = variantRouter;