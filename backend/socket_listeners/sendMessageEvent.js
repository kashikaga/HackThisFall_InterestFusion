const { redisClient } = require("../config/redis");
const sendPushNotification = require("../config/send_push_notification");
const user = require("../models/user");
const saveSingleChatMessageToDb = require("./helper/saveSingleChatMessageToDb");

/**
  -If userId2/toUserId is also in onlineUser
      then - will create a new room for this 2 users
      else - will send a notification to userId2
    default - add message to DB               
  
 */
const sendMessageEvent = async (io, socket, data) => {
  const { toUserId, fromUserId, message, chatId } = data;
  if (!fromUserId || !toUserId || !message || !chatId) {
    io.emit("error", "data can not be empty");
  }

  // Save message to DB
  console.log("Save Data to DB  ", message);
  try {
    const dbSaveMessageStatus = await saveSingleChatMessageToDb(data);
    if (dbSaveMessageStatus.status == 0) {
      io.emit("error", dbSaveMessageStatus.message);
    }
    console.log(dbSaveMessageStatus);
  } catch (e) {
    console.log("Error at save message to Db", e);
    io.emit("error", "Error at saveing message");
  }

  const usersSocketData = JSON.parse(await redisClient.get("usersSocketData"));
  const allRoomData = JSON.parse(await redisClient.get("allRoomData"));

  // check uderId2/toUserId is online
  const isUserId2InOnlineUserList = toUserId in usersSocketData;
  // Note ***: There is no need to create a Room for 2 person chat ,but future we can have group chat
  let newRoom = `chat_${fromUserId}_${toUserId}`;
  if (isUserId2InOnlineUserList) {
    // now check is there is room created already
    const isRoomAlreadyPresent =
      `chat_${toUserId}_${fromUserId}` in allRoomData ||
      `chat_${fromUserId}_${toUserId}` in allRoomData;
    if (isRoomAlreadyPresent) {
      // there is room already created
      if (`chat_${toUserId}_${fromUserId}` in allRoomData) {
        newRoom = `chat_${toUserId}_${fromUserId}`;
      } else {
        newRoom = `chat_${fromUserId}_${toUserId}`;
      }
    } else {
      // there is no room created yet so will create now
      // Check both fromUserId and toUserId has a socketId created
      if (fromUserId in usersSocketData && toUserId in usersSocketData) {
        const newRoomData = [
          {
            socketId: usersSocketData[fromUserId].id,
            userId: fromUserId,
          },
          {
            socketId: usersSocketData[toUserId].id,
            userId: toUserId,
          },
        ];
        allRoomData[newRoom] = newRoomData;
      } else {
        // fromUserId or toUserId does not have a socketId Created
        console.log("Error : No socket id for userId in send_message");
        socket.emit("error", "Users are Not Online");
      }
    }
    console.log("socket has joined ", newRoom);
  } else {
    // send notification to userId2
    //   getting playerId from DB
    const userData = await user.findOne({ _id: toUserId });
    if (!userData) {
      io.emit("error", "User not found");
    }
    await sendPushNotification(
      userData.onesignalPlayerId,
      message,
      process.env.URL_FOR_DEEP_LINK + "/chat"
    );
    console.log("notifiacation to ", toUserId, "message ", message);
  }

  await redisClient.set("usersSocketData", JSON.stringify(usersSocketData));
  await redisClient.set("allRoomData", JSON.stringify(allRoomData));

  // Will send the message to specified room or to user if its a one-one chat
  io.to(usersSocketData[toUserId]).emit("receive_message", message);
};
module.exports = sendMessageEvent;
