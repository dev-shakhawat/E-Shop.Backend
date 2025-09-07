const productShema = require("../../models/productSchema");


async function getNewArrival(req, res) {
    try {
        const products = await productShema.find({newArrival: true}).sort({createdAt: -1});
        res.status(200).send({
            success: true,
            message: "products fetched successfully",
            data: products,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}


module.exports = getNewArrival