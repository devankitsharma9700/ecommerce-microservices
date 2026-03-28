const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Order Service MongoDB Connected");
};

module.exports = { connectDB };