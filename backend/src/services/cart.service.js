const mongoose = require("mongoose");
const Cart = require("../modules/cart.model");
const Product = require("../modules/product.model");
const { getCart, setCart } = require("../utils/redisCart");

class CartService {

  static async addToCart(userId, productId, quantity) {
    const product = await Product.findOne({
      _id: productId,
      isActive: true
    });

    if (!product) throw new Error("Product unavailable");

    let cart = await getCart(userId);

    if (!cart) {
      cart = { items: [] };
    }

    const index = cart.items.findIndex(
      i => i.productId === productId
    );

    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await setCart(userId, cart);

    // persist backup
    await Cart.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        items: cart.items.map(i => ({
          product: i.productId,
          quantity: i.quantity
        }))
      },
      { upsert: true }
    );

    return this.getCartWithProducts(userId);
  }

  // 🔥 MAIN FUNCTION
  static async getCartWithProducts(userId) {
    const redisCart = await getCart(userId);
    if (!redisCart || redisCart.items.length === 0) {
      return { data: [], count: 0 };
    }

    const productIds = redisCart.items.map(
      i => new mongoose.Types.ObjectId(i.productId)
    );

    const cartData = await Product.aggregate([
      {
        $match: {
          _id: { $in: productIds },
          isActive: true
        }
      },
      {
        $lookup: {
          from: "carts",
          let: { productId: "$_id" },
          pipeline: [
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$items" },
            {
              $match: {
                $expr: { $eq: ["$items.product", "$$productId"] }
              }
            },
            {
              $project: {
                quantity: "$items.quantity"
              }
            }
          ],
          as: "cartItem"
        }
      },
      {
        $unwind: "$cartItem"
      },
      {
        $project: {
          name: 1,
          price: 1,
          stock: 1,
          images: 1,
          quantity: "$cartItem.quantity",
          subtotal: {
            $multiply: ["$price", "$cartItem.quantity"]
          }
        }
      }
    ]);
console.log("hhhhhhhhh",cartData);

    return {
      data: cartData,
      count: cartData.length
    };
  }
}

module.exports = CartService;
