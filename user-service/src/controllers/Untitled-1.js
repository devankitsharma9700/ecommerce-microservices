// const jwt = require("jsonwebtoken"); 

// const userService = require("../services/user.service");
// const { publishUserCreated } = require("../events/publisher");
// const { comparePassword } = require("../utils/hash");
// const {
//   generateAccessToken,
//   generateRefreshToken
// } = require("../utils/jwt");

// const RefreshToken = require("../models/refreshToken.model");

// // 🔐 REGISTER
// exports.register = async (req, res) => {
//   try {
//     const user = await userService.createUser(req.body);

//     await publishUserCreated(user);

//     // ❌ don't expose password
//     res.json({
//       id: user._id,
//       email: user.email,
//       name: user.name
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Registration failed" });
//   }
// };

// // 🔐 LOGIN
// exports.login = async (req, res) => {
//   try {

//     const { email, password } = req.body;

//     const user = await userService.findUserByEmail(email);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const valid = await comparePassword(password, user.password);

//     if (!valid) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     await RefreshToken.create({
//       token: refreshToken,
//       userId: user._id,
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//     });

//     res.json({
//       accessToken,
//       refreshToken
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Login failed" });
//   }
// };

// // 👤 PROFILE
// exports.profile = async (req, res) => {
//   try {
//     const user = await userService.getUserById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);

//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch profile" });
//   }
// };

// // 🔄 REFRESH TOKEN
// exports.refresh = async (req, res) => {

//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     return res.status(401).json({ message: "No refresh token" });
//   }

//   try {

//     const decoded = jwt.verify(
//       refreshToken,
//       process.env.JWT_REFRESH_SECRET
//     );

//     const tokenDoc = await RefreshToken.findOne({ token: refreshToken });

//     if (!tokenDoc) {
//       return res.status(403).json({ message: "Invalid refresh token" });
//     }

//     // 🔥 ROTATION
//     await RefreshToken.deleteOne({ token: refreshToken });

//     const user = await userService.getUserById(decoded.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const newAccessToken = generateAccessToken(user);
//     const newRefreshToken = generateRefreshToken(user);

//     await RefreshToken.create({
//       token: newRefreshToken,
//       userId: user._id,
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//     });

//     res.json({
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken
//     });

//   } catch (error) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

// // 🚪 LOGOUT
// exports.logout = async (req, res) => {

//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     return res.status(400).json({ message: "No refresh token provided" });
//   }

//   await RefreshToken.deleteOne({ token: refreshToken });

//   res.json({ message: "Logged out successfully" });
// };