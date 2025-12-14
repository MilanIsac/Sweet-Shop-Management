const express = require("express");
const router = express.Router();

const auth = require("../middleware/middleware.auth");
const { requireRole } = require("../middleware/middleware.admin");

const {
  getAllSweets,
  createSweet,
  updateSweet,
  deleteSweet
} = require("../controllers/controllers.sweets");

/* PUBLIC / USER */
router.get("/", auth, getAllSweets);

/* ADMIN ONLY */
router.post("/", auth, requireRole("admin"), createSweet);
router.put("/:id", auth, requireRole("admin"), updateSweet);
router.delete("/:id", auth, requireRole("admin"), deleteSweet);

module.exports = router;
