const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

// Authentication Routes
authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

// Password Reset Routes
authRouter.get("/forgot_password", authController.forgotPassword);
authRouter.get("/re_send_OTP", authController.resendOTP);
authRouter.get("/verify_OTP", authController.verifyOTP);
authRouter.put("/update_password", authController.updatePassword);

module.exports = authRouter;