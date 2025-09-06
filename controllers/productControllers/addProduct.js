const deleteImage = require("../../helpers/deleteImage");
const productSchema = require("../../models/productSchema");

async function addProduct(req, res) {
    try {
 
        if(!req.file) return res.status(400).send({ success: false, message: "Thumbnail is required", data: null  });

        const { productName, productDescription, productBrand , productWarenty , productCategory , withoutDiscount , discount} = req.body;

        

        if(!productName) { 
            if(req.file) deleteImage( req.file.path ) 
            return res.status(400).send({ success: false, message: "Product name is required"   });
        }

        if(!productDescription) {
            if(req.file) deleteImage( req.file.path ) 
            return res.status(400).send({ success: false, message: "Product description is required"});
        }

        if(!withoutDiscount) {
            if(req.file) deleteImage( req.file.path ) 
            return res.status(400).send({ success: false, message: "Product price is required"   });
        }
  
        if(!productCategory) {
            if(req.file) deleteImage( req.file.path ) 
            return res.status(400).send({ success: false, message: "Product category is required"  });
        }
        

        const product = await productSchema.create({
            productOwner: req.session.user._id,
            title: productName,
            description: productDescription,
            price: {
                prevPrice : withoutDiscount ,
                discount :  discount ? discount : "" ,
                currentPrice : discount ?  (Math.max(withoutDiscount  - (discount  / 100) * withoutDiscount , 0).toFixed(2)) : withoutDiscount,
            },
            brand: productBrand ? productBrand : "No Brand" ,
            warenty: productWarenty ? productWarenty : "No Warenty Available" ,
            category: productCategory,
            thumbnail: `${process.env.BASE_URL}/${req.file.filename}`,
        });

        if(!product) return res.status(400).send({ success: false, message: "Product not added , try again or contact admin", data: null  });

        return res.status(200).send({ success: true, message: "Product added successfully", })
        
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}


module.exports = addProduct