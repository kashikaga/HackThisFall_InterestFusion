const nodemailer = require("nodemailer");

async function sendEmail(toEmail, subject, text) {
  try {
    const auth = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const res = await auth.sendMail({
      from: process.env.EMAIL,
      to: toEmail,
      subject: subject,
      text: text,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
module.exports = sendEmail;
