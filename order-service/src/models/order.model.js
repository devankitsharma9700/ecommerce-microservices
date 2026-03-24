const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    productId: String,
    quantity: Number,
    status: {
      type: String,
      default: "created"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);