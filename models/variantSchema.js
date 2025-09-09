const mongoose = require("mongoose");


const variantSchema = new mongoose.Schema({
    productID: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        prevPrice: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0
        },
        currentPrice: {
            type: Number,
            required: true,
        }
    },
    images: [{
        type: String, 
    }]
});

module.exports = mongoose.model("Variant", variantSchema);