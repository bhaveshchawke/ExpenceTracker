const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  // User ka saara data temporarily yahan save hoga
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 minute baad automatic delete ho jayega
  },
});

module.exports = mongoose.model("OTP", otpSchema);
