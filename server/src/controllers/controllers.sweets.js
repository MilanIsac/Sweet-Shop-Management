const Sweet = require("../models/models.sweets.js");

exports.getAllSweets = async (req, res) => {
  const sweets = await Sweet.find();
  return res.status(200).json({
    count: sweets.length,
    sweets
  });
};

exports.createSweet = async (req, res) => {
  const sweet = await Sweet.create(req.body);
  res.status(201).json(sweet);
};

exports.updateSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  res.status(200).json(sweet);
};

