const brandSchema = require("../../models/brandSchema");

async function addBrand(req, res) {
    try {
        const { brands } = req.body;  
        if (!brands || !Array.isArray(brands) || brands.length === 0) {
            return res.status(400).send({
                success: false,
                message: "Brand array is required",
                data: null,
            });
        }

        // Prepare objects for insertMany
        const brandsToInsert = brands.map(brand => ({ name: brand  }));

        // Insert all at once
        await brandSchema.insertMany(brandsToInsert);

        res.status(201).send({
            success: true,
            message: "Brands added successfully",
            data: null,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}


module.exports = addBrand;