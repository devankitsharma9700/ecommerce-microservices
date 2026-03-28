const Product = require("../modules/product.model");

class ProductService {
  static async createProduct(data, userId) {
    return Product.create({ ...data, createdBy: userId });
  }

  static async getAllProducts(query) {
  const {
    name,
    category,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10
  } = query;

  const filter = { isActive: true };

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }),

    Product.countDocuments(filter)
  ]);

  return {
    data: products,
    count: total
  };;
}
  static async getProductById(id) {
    return Product.findById(id);
  }

  static async updateProduct(id, data) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteProduct(id) {
    return Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }
}

module.exports = ProductService;
