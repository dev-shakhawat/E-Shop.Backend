const deleteImage = require("../../helpers/deleteImage");
const variantSchema = require("../../models/variantSchema"); 


async function addVariant(req, res) {
    try { 
 
        const { productSize , productQuantity , productPriceWithoutDescount , productDescount , productColor , productId } = req.body;

        if(!productId) {
            req.files.map(file => deleteImage(file.path)) 
            return res.status(400).send({ success: false, message: "Product id is required"  });
        }

        if(!productSize) {
            req.files.map(file => deleteImage(file.path)) 
            return res.status(400).send({ success: false, message: "Product size is required"  });
        }

        if(!productQuantity) {
            req.files.map(file => deleteImage(file.path)) 
            return res.status(400).send({ success: false, message: "Product quantity is required"  });
        }

        if(!productPriceWithoutDescount) {
            req.files.map(file => deleteImage(file.path)) 
            return res.status(400).send({ success: false, message: "Product price without discount is required"  });
        }
        
        if(!req.files) {
            return res.status(400).send({ success: false, message: "Product image is required"  });
        }


        // check if variant already exists
        const existingVariant = await variantSchema.findOne({ productID: productId , size: productSize });
        if(existingVariant) {
            req.files.map(file => deleteImage(file.path)) 
            return res.status(400).send({ success: false, message: "Variant already exists , please update it"  });
        }

 
        const variant = await variantSchema.create({
            productID: productId,
            color:productColor , 
            size: productSize,
            quantity: productQuantity,
            price: {
                prevPrice: productPriceWithoutDescount,
                discount: productDescount,
                currentPrice: productDescount ? (Math.max(productPriceWithoutDescount  - (productDescount  / 100) * productPriceWithoutDescount , 0).toFixed(2)) : productPriceWithoutDescount
            },  
            images: req.files.map(file => `${process.env.BASE_URL}/${file.path}`)
        }) 

        if(!variant) return res.status(400).send({ success: false, message: "Failed to add variant"  });
 
        return res.status(200).send({
            success: true,
            message: "Product added successfully",
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


module.exports = addVariant