const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});
const ChatMessage = new mongoose.model("ChatMessage", chatMessageSchema);
module.exports = { ChatMessage, chatMessageSchema };
