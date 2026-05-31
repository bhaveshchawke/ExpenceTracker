const budgeCardModel = require("../models/budgeCardModel");
const postCreateBudgetCard = async (req, res) => {
  const { title, limit, icon } = req.body;
  try {
    const response = await budgeCardModel.create({
      user: req.session.userData.userId,
      title: title,
      limit: limit,
      icon: icon,
    });
    if (response) {
      res.status(200).json({
        message: "Budget card created successfully.",
      });
    } else {
      res.status(401).json({
        error: response.error,
      });
    }
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const getAllBudgetCard = async (req, res) => {
  try {
    const budgets = await budgeCardModel.find({
      user: req.session.userData.userId,
    });
    res.status(200).json({
      success: true,
      message: "Data fetched successfully.",
      data: budgets,
    });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({
      success: false,
      error: "Server Error: Failed to fetch data.",
    });
  }
};
// edit budget
const editCategry = async (req, res) => {
  const { _id, title, limit, icon } = req.body;
  try {
    const updatedCategory = await budgeCardModel.findOneAndUpdate(
      {
        _id: _id,
        user: req.session.userData.userId,
      },
      { title: title, limit: limit, icon: icon },
      { new: true },
    );
    if (!updatedCategory) {
      return res
        .status(404)
        .json({ error: "Category not found or unauthorized." });
    }
    return res.status(200).json({
      message: "Category updated successfully.",
    });
  } catch (error) {
    return res.status(201).json({
      error: error.message,
    });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await budgeCardModel.findOneAndDelete({
      _id: req.params.id,
      user: req.session.userData.userId,
    });
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found or unauthorized" });
    }
    // Also consider deleting associated expenses? For now just return success.
    return res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postCreateBudgetCard,
  getAllBudgetCard,
  editCategry,
  deleteCategory,
};
