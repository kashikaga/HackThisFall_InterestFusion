const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController"); // already an instance

// Authentication Routes
authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

// Password Reset Routes
authRouter.post("/forgot_password", authController.forgotPassword);
authRouter.get("/re_send_OTP", authController.resendOTP);
authRouter.post("/verify_OTP", authController.verifyOTP);
authRouter.put("/update_password", authController.updatePassword);

module.exports = authRouter;
