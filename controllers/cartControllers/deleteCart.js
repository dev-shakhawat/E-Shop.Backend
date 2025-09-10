const cartSchema = require("../../models/cartSchema");
const userSchema = require("../../models/userSchema");

async function deleteCart(req, res) {
  try {
    const { cartId } = req.body;

    // find and delete cart
    const cart = await cartSchema.findByIdAndDelete(cartId);
    if (!cart) 
      return res.status(400).send({ success: false, message: "Cart not found", data: null });

    // remove cart ID from user's allCarts array
    await userSchema.findByIdAndUpdate(
      req.user._id,
      { $pull: { "carts.allCarts": cartId } }
    );

    // recalculate subtotal
    const allCarts = await cartSchema.find({ userID: req.user._id });
    const subTotal = allCarts.reduce((sum, c) => sum + c.totalPrice, 0);

    // update user's subtotal
    await userSchema.findByIdAndUpdate(
      req.user._id,
      { subTotal }
    );

    return res.status(200).send({
      success: true,
      message: "Cart deleted successfully",
      data: cart,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = deleteCart;
