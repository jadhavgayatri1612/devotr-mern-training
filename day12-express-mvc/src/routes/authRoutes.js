const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  getAllUsers
} = require("../controllers/authController");

const { verifyToken } = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminmiddleware");

router.post("/signup", signup);

router.post("/login", login);

// Admin Only Route
router.get(
  "/users",
  verifyToken,
  requireAdmin,
  getAllUsers
);

module.exports = router;