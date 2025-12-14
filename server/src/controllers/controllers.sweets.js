const Sweet = require("../models/models.sweets");
const mongoose = require("mongoose");

/* ---------------- GET ALL SWEETS ---------------- */
exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json({
      count: sweets.length,
      sweets
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- CREATE SWEET ---------------- */
exports.createSweet = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || price == null || stock == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (price < 0 || stock < 0) {
      return res.status(400).json({ message: "Invalid price or stock" });
    }

    const sweet = await Sweet.create({ name, price, stock });
    res.status(201).json(sweet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- UPDATE SWEET ---------------- */
exports.updateSweet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    const updated = await Sweet.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- DELETE SWEET ---------------- */
exports.deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    const deleted = await Sweet.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json({ message: "Sweet deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
