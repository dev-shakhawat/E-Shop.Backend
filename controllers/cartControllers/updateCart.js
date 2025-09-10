const cartSchema = require("../../models/cartSchema");
const userSchema = require("../../models/userSchema");

async function updatecartQuantity (req , res){
    try{
        const {cartId , quantity , price} = req.body;

        if(quantity == 0) 
            return res.status(400).send({ success: false, message: "Quantity cannot be zero", data: null  });

        // update cart
        const cart = await cartSchema.findOneAndUpdate(
            { _id: cartId }, 
            { quantity , totalPrice: quantity * price}, 
            { new: true }
        );

        if(!cart) 
            return res.status(400).send({ success: false, message: "Cart not found", data: null  });

        // update user's subtotal
        const allCarts = await cartSchema.find({ userID: cart.userID });
        const subTotal = allCarts.reduce((sum, c) => sum + c.totalPrice, 0);

        await userSchema.findByIdAndUpdate(cart.userID, { subTotal });

        return res.status(200).send({
            success: true,
            message: "Cart updated successfully",
            data: cart,
        });

    }catch(error){
        return res.status(400).json({ message: error.message });
    }
}

module.exports = updatecartQuantity;
