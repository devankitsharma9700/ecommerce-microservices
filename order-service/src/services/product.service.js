const axios = require("axios");

exports.getProduct = async (productId) => {
  const res = await axios.get(
    `${process.env.PRODUCT_SERVICE_URL}/products/${productId}`
  );
  return res.data;
};