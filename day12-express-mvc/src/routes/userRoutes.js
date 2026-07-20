const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole,
} = require("../controllers/userController");

const { verifyToken } = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminMiddleware");

router.get("/", verifyToken, requireAdmin, getAllUsers);

router.get("/:id", verifyToken, getUserById);

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, requireAdmin, deleteUser);

router.patch("/:id/role", verifyToken, requireAdmin, changeUserRole);

module.exports = router;
