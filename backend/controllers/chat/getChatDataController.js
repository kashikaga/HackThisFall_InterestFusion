const Chat = require("../../models/chat");

const getChatDataController = async (req, res) => {
  const chatId = req.params.chatId;
  const { skip = 0, limit = 10 } = req.query;
  //Check if chatId belongs to specific user and then return Data

  try {
    const chatData = await Chat.findOne(
      {
        _id: chatId,
        "users.userId": req.user._id,
      },
      {
        messages: { $slice: [skip, limit] },
      }
    );
    return res.send({ status: 1, data: chatData.messages });
  } catch (e) {
    console.log(e);
    return res.send({ status: 0, message: "Something went wrong" });
  }
};
module.exports = getChatDataController;
