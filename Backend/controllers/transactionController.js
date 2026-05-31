const expenceModel = require("../models/expenceModel");
const budgeCardModel = require("../models/budgeCardModel");

const addTransactions = async (req, res) => {
  const { amount, date, note, categoryId } = req.body;
  try {
    const response = await expenceModel.create({
      user: req.session.userData.userId,
      amount: amount,
      date: date,
      note: note,
      category: categoryId,
    });
    res.status(200).json({
      message: "Transaction added successfully.",
    });
  } catch (error) {
    res.status(200).json({
      message: error.message,
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const response = await expenceModel.find({
      user: req.session.userData.userId,
    }).populate("category");
    return res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(201).json({
      message: error.message,
    });
  }
};
const getAllExpenses = async (req, res) => {
  try {
    const response = await expenceModel.find({
      user: req.session.userData.userId,
    }).populate("category");
    return res.status(200).json({
      data: response,
    });
  } catch (error) {
    return res.status(201).json({
      error: error.message,
    });
  }
};
const getAllBudgetCards = async (req, res) => {
  try {
    const response = await budgeCardModel.find({
      user: req.session.userData.userId,
    });
    return res.status(200).json({
      data: response,
    });
  } catch (error) {
    return res.status(201).json({
      error: error.message,
    });
  }
};



const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await expenceModel.findOneAndDelete({
      _id: req.params.id,
      user: req.session.userData.userId,
    });
    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found or unauthorized" });
    }
    return res.status(200).json({ message: "Transaction deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editTransaction = async (req, res) => {
  const { _id, amount, date, note, categoryId } = req.body;
  try {
    const updatedTransaction = await expenceModel.findOneAndUpdate(
      { _id, user: req.session.userData.userId },
      { amount, date, note, category: categoryId },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found or unauthorized" });
    }
    return res.status(200).json({ message: "Transaction updated successfully.", data: updatedTransaction });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTransactions,
  getTransactions,
  getAllExpenses,
  getAllBudgetCards,
  deleteTransaction,
  editTransaction,
};
