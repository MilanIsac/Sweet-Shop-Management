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


exports.deleteSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndDelete(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  res.status(200).json({ message: "Sweet deleted" });
};

const validateSweet = ({ name, price, stock }) =>
  name && price && stock;

exports.createSweet = async (req, res) => {
  if (!validateSweet(req.body)) {
    return res.status(400).json({ message: "Invalid sweet data" });
  }

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

  res.json(sweet);
};


exports.getAllSweets = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const sweets = await Sweet.find().skip(skip).limit(limit);
  const count = await Sweet.countDocuments();

  res.json({ count, sweets });
};
