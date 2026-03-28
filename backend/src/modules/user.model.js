const mongoose = require("mongoose");
const ROLES = require("../constants/roles");
const addressSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  street: String,
  city: String,
  state: String,
  country: String,
  zip: String,
  isDefault: Boolean
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
    addresses: [addressSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
