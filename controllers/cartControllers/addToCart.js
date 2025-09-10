const cartSchema = require('../../models/cartSchema');
const productSchema = require('../../models/productSchema');
const userSchema = require('../../models/userSchema');

async function addToCart(req , res){

    try{

        const { productId } = req.body; 

        // check if product is already in cart
        const existingProduct = await cartSchema.findOne({ userID: req.user._id , productID: productId });

        if(existingProduct) return res.status(400).send({ success: false, message: "Product already in cart",  data: null });
        

        // find product
        const product = await productSchema.findById(productId);
        if(!product) return res.status(400).send({ success: false, message: "Product not found", data: null  });  // product not found
        
         
        // create new cart item
        const newCart = await cartSchema.create({
            userID: req.user._id,
            productID: productId,
            quantity: 1,
            price: {
                prevPrice: product.price.prevPrice,
                discount: product.price.discount,
                currentPrice: product.price.currentPrice
             },
            totalPrice: product.price.currentPrice 
        });

        // add cart id to user's allCarts
        await userSchema.findByIdAndUpdate(
            req.user._id,
            { $push: { "carts.allCarts": newCart._id } }
        );

         //  calculate subtotal for this user
        const allCarts = await cartSchema.find({ userID: req.user._id });
        const subTotal = allCarts.reduce((sum, cart) => sum + cart.totalPrice, 0);

        //  update user subtotal
        await userSchema.findByIdAndUpdate(
            req.user._id,
            { subTotal }
         );

        return res.status(200).send({
            success: true,
            message: "Product added to cart successfully", 
        })
        
    }catch(error){
        console.log(error);
        
        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
}


module.exports = addToCart