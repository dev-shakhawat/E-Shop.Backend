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
    }
 
});

module.exports = mongoose.model("Order", orderSchema);