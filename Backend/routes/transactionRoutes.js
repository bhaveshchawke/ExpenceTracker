const express = require("express");
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");
const transactionRoute = express.Router();
transactionRoute.post(
  "/addTransactions",
  authMiddleware,
  transactionController.addTransactions,
);
transactionRoute.get(
  "/getTransactions",
  authMiddleware,
  transactionController.getTransactions,
);
transactionRoute.get(
  "/getAllExpenses",
  authMiddleware,
  transactionController.getAllExpenses,
);
transactionRoute.get(
  "/getAllBudgetCards",
  authMiddleware,
  transactionController.getAllBudgetCards,
);
transactionRoute.delete(
  "/deleteTransaction/:id",
  authMiddleware,
  transactionController.deleteTransaction,
);
transactionRoute.post(
  "/editTransaction",
  authMiddleware,
  transactionController.editTransaction,
);

module.exports = transactionRoute;
