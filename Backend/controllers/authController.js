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
        error: "user already axists",
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
    res.status(200).json({ message: "OTP bhej diya!" });
  } catch (error) {
    res.status(500).json({ error: "OTP bhejne mein error: " + error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const savedOTP = await OTP.findOne({ email, otp });
    if (!savedOTP) {
      return res
        .status(400)
        .json({ error: "OTP galat hai ya expire ho gaya!" });
    }
    const newUser = await User.create({
      fullName: savedOTP.fullName,
      email: savedOTP.email,
      phone: savedOTP.phone,
      password: savedOTP.password,
    });
    await OTP.deleteOne({ email });
    res.status(201).json({
      message: "User registered successfully! ✅",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Verification mein error: " + error.message });
  }
};

const verifyUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    //if user exist
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    //password matching
    if (!isMatch) {
      return res.status(401).json({
        error: "Pleasse Enter valid password..",
      });
    }
    //if all right
    req.session.userData = {
      userId: user._id,
      userName: user.fullName,
      userEmail: user.email,
    };
    res.status(200).json({
      message: `Login successful! ✅ welcome ${user.fullName}`,
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
      error: "User Not Authenticate",
    });
  }
};

//logout user
const logoutUser = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(401).json({
        error: "Logout Failed",
      });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};

module.exports = {
  registerUser,
  verifyOTP,
  verifyUser,
  checkUserSession,
  logoutUser,
};
