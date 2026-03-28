const express = require("express");
const router = express.Router();

const ProductController = require("../controller/product.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products with filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search by product name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Records per page
 *     responses:
 *       200:
 *         description: Product list
 */
router.get("/", ProductController.getAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 */
router.get("/:id", ProductController.getById);



/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Create a product (Only Admin or Seller can access)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro
 *               description:
 *                 type: string
 *                 example: Apple iPhone 15 Pro with A17 chip
 *               price:
 *                 type: number
 *                 example: 129999
 *               stock:
 *                 type: number
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: Electronics
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://image1.jpg
 *                   - https://image2.jpg
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 65cfa1e2d123abc456
 *                 name:
 *                   type: string
 *                   example: iPhone 15 Pro
 *                 price:
 *                   type: number
 *                   example: 129999
 *                 stock:
 *                   type: number
 *                   example: 50
 *                 category:
 *                   type: string
 *                   example: Electronics
 *                 createdBy:
 *                   type: string
 *                   example: 65b9fa9d123abc789
 *       401:
 *         description: Unauthorized (JWT missing or invalid)
 *       403:
 *         description: Forbidden (User is not Admin or Seller)
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  auth,
  role("admin", "seller"),
  ProductController.create
);


/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product (Admin/Seller)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro Max
 *               description:
 *                 type: string
 *                 example: Apple flagship phone with A17 chip
 *               price:
 *                 type: number
 *                 example: 149999
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */


router.put(
  "/:id",
  auth,
  role("admin", "seller"),
  ProductController.update
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.delete(
  "/:id",
  auth,
  role("admin"),
  ProductController.remove
);

module.exports = router;
