const router = require("express").Router();

const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", controller.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     description: Authenticate user and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", controller.login);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     description: Get logged in user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", auth, controller.profile);
/**
 * @swagger
 * /users/refresh:
 *   get:
 *     summary: refresh api
 *     tags: [Users]
 *     description: refresh token 
 *     responses:
 *       201:
 *         description: User refresh token
 *       401:
 *         description: Unauthorized
 */
router.post("/refresh", controller.refresh);

/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: logout api
 *     tags: [Users]
 *     description: log out user 
 *     responses:
 *       201:
 *         description: User refresh token
 *       401:
 *         description: Unauthorized
 */
router.post("/logout", controller.logout);

module.exports = router;