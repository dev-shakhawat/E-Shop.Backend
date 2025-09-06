const deleteImage = require("../../helpers/deleteImage");
const productSchema = require("../../models/productSchema");
const path = require("path");

async function deleteProduct(req, res) {

    try{

        const { id } = req.params; 
        
        const deleteProduct = await  productSchema.findByIdAndDelete(id)
        
        if(!deleteProduct) return res.status(400).send({ success: false, message: "product not found", data: null  });

    
        if(deleteProduct.thumbnail){
            const fileName = path.basename(deleteProduct.thumbnail);
            const filePath = path.join(process.cwd() , "uploads" , fileName);
            deleteImage(filePath) 
        }
 
        
        res.status(200).send({
            success: true,
            message: "product deleted successfully",
            data: deleteProduct,
        });


    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }

}



module.exports = deleteProduct