const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
   
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref : "User",
        required: true,
    },
    orderedProduct:{
        type: mongoose.Schema.Types.ObjectId, 
        ref : "User",
        required: true,
    },
    orderQuantity: {
        type: Number,
        required: true,
    },
    orderPrice: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    paymentStatus: {
        type: String,
        default: "Pending"
    },
    paymentMethod: {
        type: String,
        default: "Cash on Delivery"
    },
    transID: {
        type: String,
        default: ''
    }
 
});

module.exports = mongoose.model("Order", orderSchema);