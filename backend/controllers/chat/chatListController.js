const Chat = require("../../models/chat");

const chatListController = async (req, res) => {
  // will return all the chatName with last message and any new messages
  //   const allChatList = await Chat.find({ "users.userId": req.user._id });
  try {
    const allChatList = await Chat.aggregate([
      {
        $match: {
          "users.userId": req.user._id,
        },
      },
      /** check if there is any message  
        if there is no messages then []
        if there are any messages get the last message
    */
      {
        $addFields: {
          lastMessage: {
            $arrayElemAt: [
              "$messages",
              { $subtract: [{ $size: "$messages" }, 1] },
            ],
          },
        },
      },
    ]);
    console.log(allChatList);
    return res.send({ status: 1, data: { chat_list_basic_info: allChatList } });
  } catch (e) {
    console.log(e);
    return res.send({ status: 0, message: "Something went wrong at chatlist" });
  }
};

module.exports = chatListController;
