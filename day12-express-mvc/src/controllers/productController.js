const products = require("../models/productModel");

const getProducts = (req, res, next) => {
  try {
    
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const getProductById = (req, res, next) => {
  try {
    const product = products.find(
      p => p.id === Number(req.params.id)
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

const createProduct = (req, res, next) => {
  try {
    const newProduct = {
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const updateProduct = (req, res, next) => {
  try {
    const product = products.find(
      p => p.id === Number(req.params.id)
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    product.name = req.body.name;
    product.price = req.body.price;

    res.json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = (req, res, next) => {
  try {
    const index = products.findIndex(
      p => p.id === Number(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    products.splice(index, 1);

    res.json({
      message: "Product deleted"
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