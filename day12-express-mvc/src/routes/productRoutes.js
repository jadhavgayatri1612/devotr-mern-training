const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { verifyToken } = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminMiddleware");

// Public Routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Create Product
router.post("/", verifyToken, createProduct);

// Update Product
router.put("/:id", verifyToken, updateProduct);

// Delete Product (Admin Only)
router.delete("/:id", verifyToken, requireAdmin, deleteProduct);

module.exports = router;
