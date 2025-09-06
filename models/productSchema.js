const express = require("express");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        prevPrice:{
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
    thumbnail: {
        type: String,
        // required: true,
        default: null
    }, 
    category: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    reviews: [{
        reviewerName: {
            type: String,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
        rating:{
            type: Number,
            required: true
        }
    }],
    isFeatured: {
        type: Boolean,
        default: false
    },
    newArrival: {
        type: Boolean,
        default: false
    },
    brand: {
        type: String,
        required: true,
    },
    warenty: {
        type: String,
        required: true,
    }
});

module.exports =  mongoose.model("Product", productSchema);