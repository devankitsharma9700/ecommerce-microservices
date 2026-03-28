const express = require("express");
const router = express.Router();
const CartController = require("../controller/cart.controller");
const auth = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management APIs
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 69773951533e24df84882031
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product added to cart
 */
router.post("/", auth, CartController.add);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get logged-in user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 */
router.get("/", auth, CartController.get);

// /**
//  * @swagger
//  * /api/cart:
//  *   put:
//  *     summary: Update cart item quantity
//  *     tags: [Cart]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - quantity
//  *             properties:
//  *               productId:
//  *                 type: string
//  *                 example: 69773951533e24df84882031
//  *               quantity:
//  *                 type: number
//  *                 example: 5
//  *     responses:
//  *       200:
//  *         description: Cart updated successfully
//  */
// router.put("/", auth, CartController.update);

// /**
//  * @swagger
//  * /cart/{productId}:
//  *   delete:
//  *     summary: Remove product from cart
//  *     tags: [Cart]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: productId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Product ID to remove from cart
//  *     responses:
//  *       200:
//  *         description: Product removed from cart
//  */
// router.delete("/:productId", auth, CartController.remove);

// /**
//  * @swagger
//  * /cart:
//  *   delete:
//  *     summary: Clear entire cart
//  *     tags: [Cart]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Cart cleared successfully
//  */
// router.delete("/", auth, CartController.clear);


module.exports = router;
