const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    firstName:{
        type: String,
        default: ''
    },
    lastName:{
        type: String,
        default: ''
    },
    productVariantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variant",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }, 
    zipcode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isPayment:{
        type: Boolean,
        default: false
    },
    paymentMathod:{
        type: String,
        default: 'COD'
    },
    note: {
        type : String,
        default: ''
    },
    isConfirmed:{
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("Shipping", shippingSchema);