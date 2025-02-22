const Chat = require("../../models/chat");
const ConnectionRequestModel = require("../../models/connectionRequest");
const z = require("zod");
const user = require("../../models/user");
const { ChatMessage } = require("../../models/chatMessage");
// Initaly
// User wants all the chat that he has
// get all Chats only chat Names with last message with

// Scenario:
// New Device:
// >Needs all the message A-Z

// Device has already some Chat:
// >So front end will send the last timeStamp

/*
How it should work
>Open chat page initlaly /getbasicInfo will be called 
  -> will return all the chatName with last message and any new messages

>When user clicks on any chat
  -> /chatData/:chatId will be called
    -> will return all the chat messages 

*/

const sendMessageController = async (req, res) => {
  // [chatId] should be "new_chat" if this is the first time user is chating,This will be used when user chat with new people
  const { recipientId, message, chatId } = req.body;
  const messageSchema = z.string().min(1, "Message cannot be empty");
  const schemaStatus = messageSchema.safeParse(message);
  if (!schemaStatus.success) {
    return res.send({
      status: 0,
      message: "Validation Failed: Message can not be empty",
    });
  }
  //   check if user is connected to recipient
  const isUserCntedToResip = await ConnectionRequestModel.findOne({
    $or: [
      {
        fromUserId: req.user._id,
        toUserId: recipientId,
        status: "accepted",
      },
      {
        fromUserId: recipientId,
        toUserId: req.user._id,
        status: "accepted",
      },
    ],
  });
  if (!isUserCntedToResip) {
    return res.send({
      status: 0,
      message: "You are not connected to Messenger",
    });
  }
  // Add message to chat DB
  const newMessage = new ChatMessage({
    sender: req.user._id,
    message: message,
  });
  let userChat = {};
  if (chatId === "new_chat") {
    // This is new chat we need to create a new Chat Db

    const recipient = await user.findOne({ _id: recipientId });
    if (!recipient) {
      return res.send({
        status: 0,
        message: "Recipient not found",
      });
    }
    const newChat = new Chat({
      users: [
        {
          userId: req.user._id,
          userName: req.user.firstName + " " + req.user.lastName,
        },
        {
          userId: recipientId,
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
      return res.send({
        status: 0,
        message: "Chat not found",
      });
    }
  }
  //Now we need to message to ChatDb
  userChat.messages.push(newMessage);
  await userChat.save();
  res.send({ status: 1, message: "Message added successfully" });
};
module.exports = sendMessageController;
