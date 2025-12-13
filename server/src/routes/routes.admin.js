const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/middleware.admin");

router.get(
  "/",
  ...adminMiddleware,
  (req, res) => {
    res.status(200).json({ message: "Admin access granted" });
  }
);

module.exports = router;
