const Order = require("../models/order.model");
const { getProduct } = require("../services/product.service");

let channel;

exports.setChannel = (ch) => {
  channel = ch;
};

exports.createOrder = async (req, res) => {
  try {

    const { userId, productId, quantity } = req.body;
console.log("req.body",req.body);

    // 1️⃣ Validate product
    const product = await getProduct(productId);
console.log("check this one",product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // 2️⃣ Create order
    const order = await Order.create({
      userId,
      productId,
      quantity
    });

    console.log("Order created");

    // 3️⃣ Publish event
    const event = {
      orderId: order._id,
      userId,
      productId,
      quantity
    };

    // await channel.assertQueue("order.created");
    // channel.sendToQueue(
    //   "order.created",
    //   Buffer.from(JSON.stringify(event))
    // );

    await channel.assertExchange("order.exchange", "direct", {
  durable: true
});

channel.publish(
  "order.exchange",
  "order.created",
  Buffer.from(JSON.stringify(order))
);

    console.log("Order Created Event Published");

    res.status(201).json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order failed" });
  }
};