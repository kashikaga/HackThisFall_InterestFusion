// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL, // Your email
//     pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
//   },
// });

// const sendEmail = async (to, subject, text, html) => {
//   try {
//     await transporter.sendMail({
//       from: `HackThisFall_InternetFusion" <${process.env.EMAIL}>`, // Sender's address
//       to, // Receiver's address
//       subject, // Subject line
//       text, // Plain text body
//       html, // HTML body
//     });
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// module.exports = sendEmail;
