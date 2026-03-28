const User = require("../models/user.model");
const { hashPassword } = require("../utils/hash");

exports.createUser = async (data) => {

  const hashed = await hashPassword(data.password);

  return User.create({
    ...data,
    password: hashed
  });
};

exports.findUserByEmail = (email) => {
  return User.findOne({ email });
};

exports.getUserById = (id) => {
  return User.findById(id);
};