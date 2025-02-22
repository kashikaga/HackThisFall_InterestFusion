const { redisClient } = require("../config/redis");

const disconnectEvent = async (socket) => {
  // remove user from usersSocketData and all the rooms that they are part of because now there will be only 2 in room

  try {
    const usersSocketData = JSON.parse(
      await redisClient.get("usersSocketData")
    );
    const allRoomData = JSON.parse(await redisClient.get("allRoomData"));
    for (let key in usersSocketData) {
      if (usersSocketData[key] === socket.id) {
        delete usersSocketData[key];
        break;
      }
    }
    for (let key in allRoomData) {
      for (let i = 0; i < allRoomData[key].length; i++) {
        if (allRoomData[key][i].socketId === socket.id) {
          // remove that room
          delete allRoomData[key];
        }
      }
    }
    console.log("Deleteed things print");

    console.log(usersSocketData);
    console.log(allRoomData);

    await redisClient.set("usersSocketData", JSON.stringify(usersSocketData));
    await redisClient.set("allRoomData", JSON.stringify(allRoomData));
  } catch (e) {
    console.log("Error at  disconnected", e);
  }

  console.log("user disconnected", socket.id);
};
module.exports = disconnectEvent;
