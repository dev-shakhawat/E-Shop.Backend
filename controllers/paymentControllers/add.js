const orderSchema = require("../../models/orderSchema")
const variantSchema = require("../../models/variantSchema")
const mongoose = require("mongoose")
const SSLCommerzPayment = require('sslcommerz-lts')


const store_id = process.env.SSL_STORE_ID
const store_passwd = process.env.SSL_STORE_PASSWORD
const is_live = false //true for live, false for sandbox



async function addPayment(req, res) {
    try {
        
        const { billingAddress , variantInfo } = req.body;
        
        const variant = await variantSchema.findById(variantInfo.variant._id)
        if(!variant) return res.status(400).send({success: false , message: "Product not found"})

            const TransectionID = new mongoose.Types.ObjectId().toString() 
             
    const data = {
        total_amount: variantInfo?.price,
        currency: 'BDT',
        tran_id: TransectionID, // use unique tran_id for each api call
        success_url: `${process.env.BASE_URL}/payment/success/${TransectionID}`,
        fail_url: `${process.env.BASE_URL}/payment/fail/${TransectionID}`,
        cancel_url: `${process.env.BASE_URL}/payment/cancel/${TransectionID}`, 
        shipping_method: 'Courier',
        product_name: variantInfo?.title,
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: `${billingAddress.firstName} ${billingAddress.lastName}`,
        cus_email: billingAddress.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: billingAddress.city,
        cus_state: 'Dhaka',
        cus_postcode: billingAddress.zipcode,
        cus_country: 'Bangladesh',
        cus_phone: billingAddress.phone,
        cus_fax: '01711111111',
        ship_name: `${billingAddress.firstName} ${billingAddress.lastName}`,
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: billingAddress.zipcode,
        ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(async (apiResponse) => {

        await orderSchema.create({
            orderedBy: req.user._id,
            orderedProduct: variantInfo.variant._id,
            orderQuantity: variantInfo.quantity,
            orderPrice: variantInfo.price, 
            transID: TransectionID
        })

        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        return res.status(200).send({url: GatewayPageURL}) 

    });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}

module.exports = addPayment