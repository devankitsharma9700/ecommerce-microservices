const express = require("express");

const authRoutes = require("./routes/user.routes");
const productRoutes= require("./routes/product.routes");
const cartRoutes= require("./routes/cart.routes");
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
