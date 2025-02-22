const { redisClient } = require("../config/redis");

// addToUserOnlineEvent - This will add this userId to onlineUser

const addToUserOnlineEvent = async (socket, userId) => {
  console.log("came to add user", socket.id + "   " + userId);
  const usersSocketData = JSON.parse(await redisClient.get("usersSocketData"));
  console.log(typeof usersSocketData);
  console.log(usersSocketData);

  usersSocketData[userId] = socket.id;
  console.log("setting value", JSON.stringify(usersSocketData));
  await redisClient.set("usersSocketData", JSON.stringify(usersSocketData));
  // redisClient.get("usersSocketData", async (err, result) => {

  //   try {
  //     let socketData = JSON.parse(result);
  //     socketData.set(userId, socket);
  //     await redisClient.setEx("usersSocketData", JSON.stringify(socketData));
  //   } catch (e) {
  //     console.log("error ar add user", e);
  //   }
  // });
  // if (!usersSocketData.has(userId)) {
  // }else{

  // }
  console.log(await redisClient.get("usersSocketData"));
  // if (!onlineUser.includes(userId)) {
  //   onlineUser.push(userId);
  // }
};
module.exports = { addToUserOnlineEvent };
