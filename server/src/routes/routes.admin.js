const express = require("express");
const router = express.Router();
const auth = require("../middleware/middleware.auth");
const { requireRole } = require("../middleware/middleware.admin");
const { getAdminStats } = require("../controllers/controllers.admin");

router.get("/stats", auth, requireRole("admin"), getAdminStats);

module.exports = router;
