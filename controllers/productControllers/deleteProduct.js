const deleteImage = require("../../helpers/deleteImage");
const productSchema = require("../../models/productSchema");
const path = require("path");
const variantSchema = require("../../models/variantSchema");



async function deleteProduct(req, res) {

    try{

        const { id } = req.params; 
        
        const deleteProduct = await  productSchema.findByIdAndDelete(id)
        
        if(!deleteProduct) return res.status(400).send({ success: false, message: "Product not found", data: null  });

    
        if(deleteProduct.thumbnail){
            const fileName = path.basename(deleteProduct.thumbnail);
            const filePath = path.join(process.cwd() , "uploads" , fileName);
            deleteImage(filePath) 
        }

        if(deleteProduct.variants.length > 0){
            for(let i = 0; i < deleteProduct.variants.length; i++){

                // delete variant
                const variant = await variantSchema.findByIdAndDelete(deleteProduct.variants[i]);

                // delete variant images if exists
                if(variant.images.length > 0){
                    for(let i = 0; i < variant.images.length; i++){
                        const fileName = path.basename(variant.images[i]);
                        const filePath = path.join(process.cwd() , "uploads" , fileName);
                        deleteImage(filePath)  
                    }
                }
            }
        }
 
        
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
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