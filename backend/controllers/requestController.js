// controllers/requestController.js
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const sendPushNotification = require("../config/send_push_notification");

// Send Connection Request (POST /request/send/:status/:toUserId)
const sendConnectionRequest = async (req, res ,next) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    // Validation
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type: " + status });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnectionRequest) {
      return res.status(400).send({ message: "Connection Request Already Exists!!" });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    // send notification if interested
    if (status === "interested") {
      await sendPushNotification(
        toUser.onesignalPlayerId,
        req.user.firstName + " is " + status + " in you!",
        process.env.URL_FOR_DEEP_LINK + "/requests"
      );
    }

    res.json({
      message: req.user.firstName + " is " + status + " in " + toUser.firstName,
      data,
    });
  } catch (err) {
    next(err);
  }
};

// Review Connection Request (POST /request/review/:status/:requestId)
const reviewConnectionRequest = async (req, res,next) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    // Validation
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Status not allowed!" });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });
    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    // Send notification if request is accepted
    if (status === "accepted") {
      const fromUser = await User.findById(connectionRequest.fromUserId);

      if (!fromUser) {
        return res.status(400).json({ message: "Something went wrong" });
      }

      await sendPushNotification(
        fromUser.onesignalPlayerId,
        loggedInUser.firstName + " has " + status + " your request",
        process.env.URL_FOR_DEEP_LINK + "/connections"
      );
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.json({ message: "Connection request " + status, data });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendConnectionRequest,
  reviewConnectionRequest,
};
