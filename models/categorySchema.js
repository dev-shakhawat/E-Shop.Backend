const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });

// Model export করা
module.exports = mongoose.model("Category", categorySchema);
