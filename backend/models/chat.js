const mongoose = require("mongoose");
const { chatMessageSchema } = require("./chatMessage");

const chatSchema = new mongoose.Schema({
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
    },
  ],

  messages: [chatMessageSchema],
  // For tracking Last seen
  lastSeenMessage: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      // with [lastSeenDate] we can filter out the new messages for user
      lastSeenMessageDate: {
        type: Date,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = new mongoose.model("Chat", chatSchema);
module.exports = Chat;
