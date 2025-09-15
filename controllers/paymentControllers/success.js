const orderSchema = require("../../models/orderSchema");


async function paymentSuccess(req , res){ 

    await orderSchema.findOneAndUpdate({ _id: req.params.id }, { paymentStatus: "Success" })

    res.redirect(`http://localhost:5173/payment/success/${req.params.id}`)

} 



module.exports = paymentSuccess