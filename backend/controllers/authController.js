const User = require("../models/user");
const Token = require("../models/token");
const bcrypt = require("bcryptjs");
const { validateSignUpData } = require("../utils/validation");
const sendEmail = require("../config/sendEmail");
const validator = require("validator");
const { z } = require("zod");
const removeSensitiveData = require("../utils/removeSensitiveData");

// Schema definitions
const emailSchema = z.string().email("Invalid email format");
const loginSchema = z.object({
  emailId: z.string().email("Invalid email format"),
  password: z.string(),
});

// Email template configurations
const emailTemplates = {
  welcome: (firstName) => ({
    subject: "Welcome to Interest Fusion! 🎉",
    text: `Hi ${firstName}, welcome to Interest Fusion! We're excited to have you join our community of like-minded individuals.`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Interest Fusion</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px 20px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to Interest Fusion!</h1>
                </div>
                
                <!-- Content -->
                <div style="padding: 40px 30px;">
                  <h2 style="color: #1f2937; margin-top: 0;">Hi ${firstName}! 👋</h2>
                  <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                    We're thrilled to have you join our community! Interest Fusion is where meaningful connections happen through shared passions and interests.
                  </p>
                  
                  <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 30px 0;">
                    <h3 style="color: #1f2937; margin-top: 0;">Quick Start Guide:</h3>
                    <ul style="color: #4b5563; padding-left: 20px;">
                      <li style="margin-bottom: 10px;">Complete your profile to help others discover you</li>
                      <li style="margin-bottom: 10px;">Add your interests and skills</li>
                      <li style="margin-bottom: 10px;">Explore and connect with like-minded people</li>
                    </ul>
                  </div>
                  
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="https://interestfusion.com/getting-started" 
                       style="display: inline-block; padding: 12px 24px; background: #6366f1; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500;">
                      Complete Your Profile
                    </a>
                  </div>
                </div>
                
                <!-- Footer -->
                <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0;">
                    Interest Fusion · Making connections meaningful<br>
                    <a href="\${unsubscribeUrl}" style="color: #6b7280;">Unsubscribe</a> · 
                    <a href="\${preferencesUrl}" style="color: #6b7280;">Email Preferences</a>
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  }),

  login: (firstName, loginInfo) => ({
    subject: "New Login to Your Interest Fusion Account 🔐",
    text: `Hi ${firstName}, we detected a new login to your account.`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Notification</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px 20px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Login Detected</h1>
                </div>
                
                <!-- Content -->
                <div style="padding: 30px;">
                  <h2 style="color: #1f2937; margin-top: 0;">Hi ${firstName},</h2>
                  <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                    We detected a new login to your Interest Fusion account. If this was you, no action is needed.
                  </p>
                  
                  <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #1f2937; margin-top: 0;">Login Details:</h3>
                    <p style="color: #4b5563; margin: 0;">
                      Time: ${new Date().toLocaleString()}<br>
                      Browser: ${loginInfo?.browser || "Unknown"}<br>
                      Location: ${loginInfo?.location || "Unknown"}
                    </p>
                  </div>
                  
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="https://interestfusion.com/security" 
                       style="display: inline-block; padding: 12px 24px; background: #6366f1; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500;">
                      Review Account Security
                    </a>
                  </div>
                </div>
                
                <!-- Footer -->
                <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0;">
                    Interest Fusion · Making connections meaningful<br>
                    <a href="\${unsubscribeUrl}" style="color: #6b7280;">Unsubscribe</a> · 
                    <a href="\${preferencesUrl}" style="color: #6b7280;">Email Preferences</a>
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  }),
};

class AuthController {
  // Signup controller
  async signup(req, res, next) {
    try {
      validateSignUpData(req);
      const {
        firstName,
        lastName,
        emailId,
        password,
        playerId,
        skills,
        otherLink,
        instagramLink,
      } = req.body;

      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        skills: skills ?? [],
        onesignalPlayerId: playerId,
        socialLinks: {
          instagramLink,
          otherLink,
        },
      });

      const savedUser = await user.save();
      const token = await savedUser.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        sameSite: "None",
        secure: true,
      });

      // Send enhanced welcome email
      const welcomeTemplate = emailTemplates.welcome(firstName);
      await sendEmail(
        emailId,
        welcomeTemplate.subject,
        welcomeTemplate.text,
        welcomeTemplate.html
      );

      res.json({
        message: "Welcome to Interest Fusion!",
        data: res.send(removeSensitiveData(savedUser)),
      });
    } catch (err) {
      next(err);
    }
  }

  // Login controller
  async login(req, res, next) {
    try {
      const { emailId, password, playerId } = req.body;
      const loginSchemaValidator = loginSchema.safeParse({
        emailId: emailId,
        password: password,
        onesignalPlayerId: playerId,
      });

      if (!loginSchemaValidator.success) {
        return res.status(400).send({
          message: "Validation Failed :" + loginSchemaValidator.error,
        });
      }

      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isPasswordValid = await user.validatePassword(password);
      if (isPasswordValid) {
        const token = await user.getJWT();

        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
          sameSite: "None",
          secure: true,
        });

        const loginInfo = {
          browser: req.headers["user-agent"],
          location: req.ip,
        };

        const loginTemplate = emailTemplates.login(user.firstName, loginInfo);
        await sendEmail(
          emailId,
          loginTemplate.subject,
          loginTemplate.text,
          loginTemplate.html
        );
        res.send(removeSensitiveData(user));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      next(err);
    }
  }

  // Logout controller
  async logout(req, res, next) {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: "None",
      secure: true,
    });
    res.send("Successfully logged out from Interest Fusion!");
  }

  // Forgot password controller
  async forgotPassword(req, res) {
    const userEmailID = req.body.emailId;
    const checkEmailSchema = emailSchema.safeParse(userEmailID);

    if (!checkEmailSchema) {
      return res
        .status(400)
        .send({ message: "Validation Failed :" + checkEmailSchema.error });
    }

    const isUserAlreadyPresent = await Token.findOne({ emailId: userEmailID });
    if (isUserAlreadyPresent) {
      res.send({ status: 0, message: "Unable to send Email" });
      return;
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const subject = "Password reset request for Interest Fusion";
    const text = "Your OTP is " + token;

    const newToken = new Token({
      emailId: userEmailID,
      token: token,
    });
    await newToken.save();

    const isEmailSent = await sendEmail(userEmailID, subject, text);
    if (isEmailSent) {
      res.send({ status: 1, message: "OTP successfully sent to EmailId" });
    } else {
      res.send({ status: 0, message: "Unable to send OTP to this Email Id" });
    }
  }

  // Resend OTP controller
  async resendOTP(req, res) {
    const userEmailID = req.body.emailId;
    const checkEmailSchema = emailSchema.safeParse(userEmailID);

    if (!checkEmailSchema) {
      return res
        .status(400)
        .send({ message: "Validation Failed :" + checkEmailSchema.error });
    }

    const isUserAlreadyPresent = await Token.findOne({ emailId: userEmailID });
    if (!isUserAlreadyPresent) {
      res.send({ status: 0, message: "something went wrong " });
      return;
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const subject = "Password reset request for Interest Fusion";
    const text = "Your OTP is " + token;

    await isUserAlreadyPresent.updateOne({
      $set: {
        token: token,
        createdAt: Date.now(),
      },
    });

    const isEmailSent = await sendEmail(userEmailID, subject, text);
    if (isEmailSent) {
      res.send({ status: 1, message: "OTP successfully sent to EmailId" });
    } else {
      res.send({ status: 0, message: "Something went wrong" });
    }
  }

  // Verify OTP controller
  async verifyOTP(req, res) {
    const { emailId, otp } = req.body;
    const verifyOTPSchema = z.object({
      emailId: emailSchema,
      otp: z.string().min(6, "OTP must be 6 digit"),
    });

    const verifyOTPSchemaValdate = verifyOTPSchema.safeParse({
      emailId: emailId,
      otp: otp,
    });

    if (!verifyOTPSchemaValdate) {
      return res.status(400).send({
        message: "Validation Failed :" + verifyOTPSchemaValdate.error,
      });
    }

    const isUserPresent = await Token.findOne({ emailId });
    if (!isUserPresent) {
      res.send({ status: 0, message: "User has not got any OTP" });
    }

    const oneHourFromCreatedAt = isUserPresent.createdAt * 60 * 60 * 1000;
    if (!(Date.now() < oneHourFromCreatedAt)) {
      res.send({ status: 0, message: "OTP has expired" });
      return;
    }

    if (isUserPresent.token === otp) {
      await isUserPresent.updateOne({ $set: { isVerified: true } });
      res.send({ status: 1, message: "OTP verified" });
    } else {
      res.send({ status: 0, message: "Invalid OTP" });
    }
  }

  // Update password controller
  async updatePassword(req, res) {
    const { emailId, password } = req.body;
    const updatePasswordSchema = z.object({
      emailId: emailSchema,
      password: z.string(),
    });

    const updatePasswordSchemaValidate = updatePasswordSchema.safeParse({
      emailId: emailId,
      password: password,
    });

    if (!updatePasswordSchemaValidate.success) {
      return res.status(400).send({
        message: "Validation Failed :" + updatePasswordSchemaValidate.error,
      });
    }

    const isUserPresent = await Token.findOne({ emailId });
    if (!isUserPresent) {
      res.send({ status: 0, message: "Please verify OTP to change password" });
      return;
    }

    if (!isUserPresent.isVerified) {
      res.send({ status: 0, message: "Please verify OTP to change password" });
      return;
    }

    const oneHourFromCreatedAt = isUserPresent.createdAt * 60 * 60 * 1000;
    if (!(Date.now() < oneHourFromCreatedAt)) {
      res.send({ status: 0, message: "Please verify OTP again" });
      return;
    }

    if (!validator.isStrongPassword(password)) {
      res.send({ status: 0, message: "Please enter a strong Password!" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.findOne({ emailId });
    if (!user) {
      res.send({ status: 0, message: "User not found" });
      return;
    }

    await user.updateOne({
      $set: {
        password: passwordHash,
      },
    });

    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      sameSite: "None",
      secure: true,
    });

    await Token.deleteOne({ emailId });
    res.send({ status: 1, message: "Password Updated successfully" });
  }
}

module.exports = new AuthController();
