const productSchema = require("../../models/productSchema");

async function getSingleProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await productSchema.findById(id).populate("productOwner Variant");

        if(!product) return res.status(400).send({ success: false, message: "Product not found"   });

        return res.status(200).send({
            success: true,
            message: "Product fetched successfully",
            data: product,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}

module.exports = getSingleProduct