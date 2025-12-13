const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/middleware.auth.js");

router.get("/", authMiddleware, (req, res) => {
  res.json({ message: "Access granted" });
});

module.exports = router;
