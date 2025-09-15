const orderSchema = require("../../models/orderSchema")


async function paymentCanceled(req , res){

    await orderSchema.findOneAndDelete({ _id: req.params.id })

    res.redirect(`http://localhost:5173/payment/cancel/${req.params.id}`)

} 



module.exports = paymentCanceled