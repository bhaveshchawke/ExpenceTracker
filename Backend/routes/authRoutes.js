const authController = require("../controllers/authController");
const { loginLimiter } = require("../middleware/loginLimiter");
const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/verifyOTP", authController.verifyOTP);
authRouter.post("/verifyUser", loginLimiter, authController.verifyUser);
authRouter.get("/me", authController.checkUserSession);
authRouter.post("/logout", authController.logoutUser);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password", authController.resetPassword);
authRouter.put("/update-profile", authController.updateProfile);
module.exports = authRouter;
