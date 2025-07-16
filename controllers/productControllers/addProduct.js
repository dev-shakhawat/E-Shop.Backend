const productSchema = require("../../models/productSchema");

async function addProduct(req, res) {
    try {
        const { title, description, price, thumbnail, images, category, rating } = req.body;

        const product = new productSchema({
            title,
            description,
            price,
            thumbnail,
            images,
            category,
            rating,
        });

        await product.save();
        res.status(201).send({
            success: true,
            message: "product added successfully",
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


module.exports = addProduct