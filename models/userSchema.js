const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({ 
    firstName:{
      type: String,
      default: ""
    },
    lastName:{
      type: String,
      default: ""
    }, 
    email: {
      type: String,
      required: true,
      unique: [true , "Email already exists"],
      validate: {
        validator: function (email) {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        },
        message: 'invalid email'
      }
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
      required: true, 
      unique: [true , "Username already exists"]
    },
    otp: {
      type: Number,
      default: null
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    carts: {
      allCarts : [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
          }
        ]
    },
    subTotal: {
      type: Number,
      default: 0
    },
    billingAddress: {
      firstName: String,
      lastName: String,
      phoneNumber: String,
      emailAddress: String,
      address: String, 
      city: String,
      state: String,
      country: String,
      zipCode: String,
      orderNotes: String,
    }
  });

module.exports = mongoose.model('User', userSchema);