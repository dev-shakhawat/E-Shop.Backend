const orderSchema = require("../../models/orderSchema")


async function paymentFailed(req , res){

    await orderSchema.findOneAndDelete({ _id: req.params.id } )

    res.redirect(`http://localhost:5173/payment/fail/${req.params.id}`)
} 




module.exports = paymentFailed