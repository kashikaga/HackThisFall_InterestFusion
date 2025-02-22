const express = require("express");
const sendMessage = require("../controllers/chat/sendMessageController");
const { userAuth } = require("../middlewares/auth");
const chatListController = require("../controllers/chat/chatListController");
const getChatDataController = require("../controllers/chat/getChatDataController");

const chatRouter = express.Router();

chatRouter.get("/get_chat_list", userAuth, chatListController);
chatRouter.post("/send_message", userAuth, sendMessage);
chatRouter.get("/get_chat_data/:chatId", userAuth, getChatDataController);

module.exports = chatRouter;
