const brandSchema = require("../../models/brandSchema");

async function getBrand(req, res) {
    try {
        const brands = await brandSchema.find();
        res.status(200).send({
            success: true,
            message: "Brands fetched successfully",
            data: brands,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}

module.exports = getBrand