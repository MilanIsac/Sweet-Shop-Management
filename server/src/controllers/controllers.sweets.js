const Sweet = require("../models/models.sweets.js");

exports.getAllSweets = async (req, res) => {
  const sweets = await Sweet.find();
  return res.status(200).json({
    count: sweets.length,
    sweets
  });
};
