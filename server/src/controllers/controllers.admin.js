const Sweet = require("../models/models.sweets");
const User = require("../models/models.user");

exports.getAdminStats = async (req, res) => {
  try {
    const totalSweets = await Sweet.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalStockAgg = await Sweet.aggregate([
      { $group: { _id: null, stock: { $sum: "$stock" } } },
    ]);

    res.json({
      totalSweets,
      totalUsers,
      totalStock: totalStockAgg[0]?.stock || 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load admin stats" });
  }
};
