const cartSchema = require('../../models/cartSchema');
const productSchema = require('../../models/productSchema');

async function addToCart(req , res){

    try{

        const { productId } = req.body; 

        // check if product is already in cart
        const existingProduct = await cartSchema.findOne({ userID: req.user._id , productID: productId });

        if(existingProduct) return res.status(400).send({ success: false, message: "Product already in cart",  data: null });
        

        // find product
        const product = await productSchema.findById(productId);
        if(!product) return res.status(400).send({ success: false, message: "product not found", data: null  });  // product not found
        

        // add product to cart
        await cartSchema.create({
            userID: req.user._id,
            productID: productId,
            quantity: 1,
            price: {
                prevPrice: product.price.prevPrice,
                discount: product.price.discount,
                currentPrice: product.price.currentPrice
            },
            totalPrice: product.price.currentPrice 
        })
        

        return res.status(200).send({
            success: true,
            message: "Product added to cart successfully", 
        })
        
    }catch(error){
        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
}


module.exports = addToCart