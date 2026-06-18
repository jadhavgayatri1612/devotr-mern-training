const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { verifyToken } = require("../middleware/authMiddleware");

//  Public Routes 
router.get("/", getProducts);
router.get("/:id", getProductById);


// Create product(Post)
router.post("/",verifyToken, createProduct);

// Update (Put)
router.put("/:id", verifyToken, updateProduct);

// Delete product
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;