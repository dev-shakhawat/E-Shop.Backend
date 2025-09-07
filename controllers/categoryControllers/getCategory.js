const categorySchema = require("../../models/categorySchema");

const getCategory = async (req, res) => {
    try { 
        const categories = await categorySchema.find();
         return res.status(200).json({ success: true, data: categories });
         
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = getCategory;