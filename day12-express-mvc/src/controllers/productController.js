const Product = require("../models/productModel");

// GET ALL PRODUCTS + FILTERING + SORTING + PAGINATION
const getProducts = async (req, res, next) => {
  try {
    const filter = {};

    // Category Filter
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // InStock Filter
    if (req.query.inStock) {
      filter.inStock = req.query.inStock === "true";
    }

    // Sorting
    const sortField = req.query.sort || "createdAt";
    const sortOrder = req.query.order === "desc" ? -1 : 1;

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    // Total Records
    const total = await Product.countDocuments(filter);

    // Fetch Products
    const products = await Product.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    next(err);
  }
};

// GET PRODUCT BY ID
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// CREATE PRODUCT
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};