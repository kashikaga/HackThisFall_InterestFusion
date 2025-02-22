const { z } = require("zod");
const Chat = require("../../models/chat");
const { ChatMessage } = require("../../models/chatMessage");
const ConnectionRequestModel = require("../../models/connectionRequest");
const user = require("../../models/user");

// async function saveMessageToDb(data) {
//   const { toUserId, fromUserId, message } = data;
//   const toUserData = await user.findOne({ _id: toUserId });
//   const fromUserData = await user.findOne({ _id: fromUserId });
//   if (!toUserData || !fromUserData) {
//     return false;
//   }
// }

const saveSingleChatMessageToDb = async (data) => {
  // [chatId] should be "new_chat" if this is the first time user is chating,This will be used when user chat with new people
  const { toUserId, fromUserId, message, chatId } = data;

  const messageSchema = z.string().min(1, "Message cannot be empty");
  const schemaStatus = messageSchema.safeParse(message);
  if (!schemaStatus.success) {
    return {
      status: 0,
      message: "Validation Failed: Message can not be empty",
    };
  }
  const recipient = await user.findOne({ _id: toUserId });
  const sender = await user.findOne({ _id: fromUserId });

  if (!recipient || !sender) {
    return { status: 0, message: "Users not found" };
  }

  //   check if user is connected to recipient
  const isUserCntedToResip = await ConnectionRequestModel.findOne({
    $or: [
      {
        fromUserId: sender._id,
        toUserId: toUserId,
        status: "accepted",
      },
      {
        fromUserId: toUserId,
        toUserId: sender._id,
        status: "accepted",
      },
    ],
  });
  if (!isUserCntedToResip) {
    return { status: 0, message: "You are not connected to Messenger" };
  }
  // Add message to chat DB
  const newMessage = new ChatMessage({
    sender: sender._id,
    message: message,
  });
  let userChat = {};
  if (chatId === "new_chat") {
    // This is new chat we need to create a new Chat Db

    const recipient = await user.findOne({ _id: toUserId });
    if (!recipient) {
      return { status: 0, message: "Recipient not found" };
    }
    const newChat = new Chat({
      users: [
        {
          userId: sender._id,
          userName: sender.firstName + " " + sender.lastName,
        },
        {
          userId: toUserId,
          userName: recipient.firstName + " " + recipient.lastName,
        },
      ],
      messages: [],
      lastSeenMessage: [],
    });
    userChat = await newChat.save();
  } else {
    userChat = await Chat.findOne({ _id: chatId });
    if (!userChat) {
      return {
        status: 0,
        message: "Chat not found",
      };
    }
  }
  //Now we need to message to ChatDb
  userChat.messages.push(newMessage);
  await userChat.save();
  return { status: 1, message: "Message added successfully" };
};
module.exports = saveSingleChatMessageToDb;
