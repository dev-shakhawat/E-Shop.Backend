const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    userID: {
        type:   mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    productID: {
        type:  mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1 
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