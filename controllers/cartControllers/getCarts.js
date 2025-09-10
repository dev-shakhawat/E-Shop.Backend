const cartSchema = require("../../models/cartSchema");


async function getCarts(req, res) {
    try {
        const carts = await cartSchema.find({ userID: req.user._id }).populate("productID"); 

        if(!carts) return res.status(400).send({ success: false, message: "Carts not found , please add products to cart", data: null  });


        return res.status(200).send({
            success: true,
            message: "carts fetched successfully",
            data: carts,
        });


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = getCarts