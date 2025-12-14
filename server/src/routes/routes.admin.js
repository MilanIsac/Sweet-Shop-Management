const express = require("express");
const router = express.Router();

const auth = require("../middleware/middleware.auth");
const { requireRole } = require("../middleware/middleware.admin");

router.get(
  "/",
  auth,
  requireRole("admin"),
  (req, res) => {
    res.status(200).json({ message: "Admin access granted" });
  }
);

module.exports = router;
