const productShema = require("../../models/productSchema");

async function getProduct(req, res) {
    try {
        const { category, brand, minPrice, maxPrice } = req.query;

        let filter = {};

        // multiple category filter
        if (category) {
            // category আসতে পারে array আকারে বা comma-separated string
            const categories = Array.isArray(category) ? category : category.split(",");
            filter.category = { $in: categories };
        }

        // multiple brand filter
        if (brand) {
            const brands = Array.isArray(brand) ? brand : brand.split(",");
            filter.brand = { $in: brands };
        }

        // price range filter
        if (minPrice && maxPrice) {
            filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
        } else if (minPrice) {
            filter.price = { $gte: Number(minPrice) };
        } else if (maxPrice) {
            filter.price = { $lte: Number(maxPrice) };
        }

        const products = await productShema.find(filter);

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

module.exports = getProduct;
