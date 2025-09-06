const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    userID: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        required: true,
    },
    variantID: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'Variant'},
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
    totalPrice: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Cart", cartSchema);