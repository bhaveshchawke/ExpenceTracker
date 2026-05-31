const mongoose = require("mongoose");

const expenceModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "budgetCard",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("expence", expenceModel);
