const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // This will clears this after THE expire TiME
    expires: 3600, //One hour
  },
});
const Token = new mongoose.model("Token", tokenSchema);
module.exports = Token;
