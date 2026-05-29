/*controllers*/
const authController = require("../controllers/authController");
const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/verifyOTP", authController.verifyOTP);
authRouter.post("/verifyUser", authController.verifyUser);
authRouter.get("/me", authController.checkUserSession);
authRouter.post("/logout", authController.logoutUser);
module.exports = authRouter;
