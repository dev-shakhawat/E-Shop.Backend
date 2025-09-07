const productSchema = require("../../models/productSchema");


const getFeaturedProduct = async (req, res) => {
    try{

        const products = await productSchema.find({isFeatured: true}).sort({createdAt: -1});

        if(!products) res.status(400).send({ success: false, message: "Products not found ", data: null  });

        res.status(200).send({
            success: true,
            message: "products fetched successfully",
            data: products,
        });

    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
}


module.exports = getFeaturedProduct