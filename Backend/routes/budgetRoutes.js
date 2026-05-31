const express = require("express");
const budgetRoute = express.Router();
const budgetController = require("../controllers/budgetController");
const authMiddleware = require("../middlewares/authMiddleware");

budgetRoute.post(
  "/createBudgetCard",
  authMiddleware,
  budgetController.postCreateBudgetCard,
);
budgetRoute.get(
  "/getBudgetCard",
  authMiddleware,
  budgetController.getAllBudgetCard,
);
budgetRoute.post("/editCategry", authMiddleware, budgetController.editCategry);
budgetRoute.delete("/deleteCategory/:id", authMiddleware, budgetController.deleteCategory);
module.exports = budgetRoute;
