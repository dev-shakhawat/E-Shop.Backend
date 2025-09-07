const categorySchema = require("../../models/categorySchema");

async function addCatagory(req, res) {
    try {
        const { category } = req.body; // category = ["Mobile Phones", "Laptops", ...]

        if (!category || !Array.isArray(category) || category.length === 0) {
            return res.status(400).send({
                success: false,
                message: "Category array is required",
                data: null,
            });
        }

        // Prepare objects for insertMany
        const categoriesToInsert = category.map(cat => ({ name: cat }));

        // Insert all at once
        await categorySchema.insertMany(categoriesToInsert);

        res.status(201).send({
            success: true,
            message: "Categories added successfully",
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

module.exports = addCatagory;
