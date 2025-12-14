const express = require("express");
const router = express.Router();

const { getAllSweets, createSweet } = require("../controllers/controllers.sweets");
const auth = require("../middleware/middleware.auth");
const { requireRole } = require("../middleware/middleware.admin");

router.get("/", getAllSweets);
router.post("/", auth, requireRole("admin"), createSweet);
router.put("/:id", auth, requireRole("admin"), updateSweet);


module.exports = router;
