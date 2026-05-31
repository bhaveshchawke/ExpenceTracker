const User = require("../models/userModel");
const Expense = require("../models/expenceModel");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    
    const expenses = await Expense.find();
    const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

    const recentUsers = await User.find().sort({ createdAt: -1 }).select("-password").limit(5);

    res.status(200).json({
      totalUsers,
      totalExpenses,
      recentUsers
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin stats: " + error.message });
  }
};

module.exports = {
  getAdminStats
};
