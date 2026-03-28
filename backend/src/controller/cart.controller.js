const CartService = require("../services/cart.service");
class CartController {

  static async add(req, res) {
    const data = await CartService.addToCart(
      req.user.id,
      req.body.productId,
      req.body.quantity
    );

    res.json(data);
  }

  static async get(req, res) {
    const cart = await CartService.getCartWithProducts(req.user.id);
    res.json(cart);
  }
}
module.exports = CartController;