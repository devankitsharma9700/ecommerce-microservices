const ProductService = require("../services/product.service");

class ProductController {
  static async create(req, res, next) {
    try {
      const product = await ProductService.createProduct(
        req.body,
        req.user._id
      );
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
   try {
    const result = await ProductService.getAllProducts(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }

  }

  static async getById(req, res, next) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const product = await ProductService.updateProduct(
        req.params.id,
        req.body
      );
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async remove(req, res, next) {
    try {
      const product = await ProductService.deleteProduct(req.params.id);
      res.json({ message: "Product deleted", product });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
