const bcrypt = require("bcryptjs");
const User = require("../modules/user.model");
const  generateToken  = require("../utils/jwt");

const registerUser = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  return { id: user._id, email: user.email };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken(user);

  return { token };
};

const getAllUsers = async(req) =>{
  return await User.find();
}

module.exports = { registerUser, loginUser,getAllUsers };
