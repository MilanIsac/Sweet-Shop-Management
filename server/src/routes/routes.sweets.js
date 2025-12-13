const express = require("express");
const router = express.Router();
const { getAllSweets } = require("../controllers/controllers.sweets.js");

router.get("/", getAllSweets);

module.exports = router;
