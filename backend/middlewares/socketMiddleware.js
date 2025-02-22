const jwt = require("jsonwebtoken");
const User = require("../models/user");

const socketMiddleware = async (socket) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split(";")
      .find((cookie) => cookie.trim().startsWith("token="))
      ?.split("=")[1];
    // console.log(token);
    // console.log(
    //   socket.handshake.headers.cookie
    //     ?.split(";")
    //     .find((cookie) => cookie.trim().startsWith("token="))
    //     ?.split("=")[1]
    // );

    if (!token) {
      console.log("middleware failed");

      return false;
    }
    const decodedObj = jwt.verify(token, "DEV@Tinder$790");

    const { _id } = decodedObj;

    const user = await User.findById({ _id });
    if (!user) {
      throw new Error("User not found");
    }

    // req.user = user;
    // next();
    console.log("ok bhai in socket");
    return true;
  } catch (err) {
    console.log("ERROR", err.message);
    return false;

    // res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  socketMiddleware,
};
