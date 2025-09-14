const deleteImage = require("../../helpers/deleteImage");
const variantSchema = require("../../models/variantSchema");
const productSchema = require("../../models/productSchema");
const path = require("path");


async function deleteVariant(req, res) {
    try {
        const { id } = req.params;
        const variant = await variantSchema.findByIdAndDelete(id).populate("productID"); ;

        if (!variant) {
            return res.status(400).send({ success: false, message: "variant not found" });
        }

 

        // delete variant Images 
        if(variant.images.length > 0){
            for(let i = 0; i < variant.images.length; i++){
                const fileName = path.basename(variant.images[i]);
                const filePath = path.join(process.cwd() , "uploads" , fileName);
                deleteImage(filePath)  
            }
        }


        // remove variant from product 
        const product = await productSchema.findById(variant.productID);
        const index = product.variants.indexOf(variant._id);
        if (index !== -1) {
            product.variants.splice(index, 1);
            await product.save();
        }

        return res.status(200).send({
            success: true,
            message: "variant deleted successfully",
            data: variant,
        });
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}


module.exports = deleteVariant