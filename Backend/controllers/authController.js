const User = require("../models/userModel");
const OTP = require("../models/otpModel");
const sendOTPEmail = require("../services/emailService");
const bcrypt = require("bcrypt");
//otp sending
const registerUser = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  try {
    const axistingUser = await User.findOne({ email });
    if (axistingUser) {
      return res.status(400).json({
        error: "User already exists.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await User.deleteMany({ email });
    await OTP.create({
      email,
      otp,
      fullName,
      phone,
      password: hashedPassword,
    });
    await sendOTPEmail(email, otp);
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP: " + error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const savedOTP = await OTP.findOne({ email, otp });
    if (!savedOTP) {
      return res
        .status(400)
        .json({ error: "Invalid or expired OTP." });
    }
    const newUser = await User.create({
      fullName: savedOTP.fullName,
      email: savedOTP.email,
      phone: savedOTP.phone,
      password: savedOTP.password,
    });
    await OTP.deleteOne({ email });
    res.status(201).json({
      message: "User registered successfully.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Verification failed: " + error.message });
  }
};

const verifyUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    //if user exist
    if (!user) {
      return res.status(401).json({
        error: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    //password matching
    if (!isMatch) {
      return res.status(401).json({
        error: "Please enter a valid password.",
      });
    }
    //if all right
    req.session.userData = {
      userId: user._id,
      userName: user.fullName,
      userEmail: user.email,
      phone: user.phone, // Adding phone as well for the profile page
      isAdmin: user.email === process.env.ADMIN_EMAIL,
    };
    res.status(200).json({
      message: `Login successful. Welcome, ${user.fullName}.`,
      user: req.session.userData,
    });
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
};

//if loggedin
const checkUserSession = (req, res) => {
  if (req.session && req.session.userData) {
    res.status(200).json({
      isLoggedIn: true,
      user: req.session.userData,
    });
  } else {
    res.status(401).json({
      isLoggedIn: false,
      error: "User is not authenticated.",
    });
  }
};

//logout user
const logoutUser = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(401).json({
        error: "Logout failed.",
      });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully." });
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User with this email not found." });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.deleteMany({ email });
    await OTP.create({
      email,
      otp,
      fullName: user.fullName, // using existing name to pass validation if required
      phone: user.phone || "0000000000",
      password: user.password, // keeping existing hash temporarily
    });
    await sendOTPEmail(email, otp);
    res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    res.status(500).json({ error: "Error sending OTP: " + error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const savedOTP = await OTP.findOne({ email, otp });
    if (!savedOTP) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    await OTP.deleteMany({ email });
    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error resetting password: " + error.message });
  }
};

const updateProfile = async (req, res) => {
  if (!req.session || !req.session.userData) {
    return res.status(401).json({ error: "User is not authenticated." });
  }

  const { fullName } = req.body;
  if (!fullName || fullName.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const userId = req.session.userData.userId;
    const user = await User.findByIdAndUpdate(userId, { fullName: fullName.trim() }, { new: true });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update session
    req.session.userData.userName = user.fullName;
    
    res.status(200).json({ 
      message: "Profile updated successfully!",
      user: req.session.userData 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile: " + error.message });
  }
};

module.exports = {
  registerUser,
  verifyOTP,
  verifyUser,
  checkUserSession,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateProfile,
};
