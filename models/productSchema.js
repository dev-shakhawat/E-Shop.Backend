const express = require("express");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        // required: true,
        default: null
    },
    images: {
        type: Array,
        // required: true,
    },
    category: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
    variants: [
        {
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
            }
        }
    ],
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
    }]
});

module.exports =  mongoose.model("Product", productSchema);