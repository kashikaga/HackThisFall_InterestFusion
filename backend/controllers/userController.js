// controllers/userController.js
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all pending connection requests for the logged-in user
const getPendingRequests = async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    next(err);
  }
};

// Get all accepted connections for the logged-in user
const getUserConnections = async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) =>
      row.fromUserId._id.toString() === loggedInUser._id.toString()
        ? row.toUserId
        : row.fromUserId
    );

    res.json({ data });
  } catch (err) {
    next(err);
  }
};

// Get user feed (excluding connections and requests)
const getUserFeed = async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    // seperate fromUserId and toUserId
    const userIdsToExclude = connectionRequests.flatMap((item) => [
      item.fromUserId,
      item.toUserId,
    ]);

    targetSkills = loggedInUser.skills;
    const users = await User.aggregate([
      // create how many skills match with current user and store it in matchingSkills
      {
        $addFields: {
          matchingSkills: {
            $filter: {
              input: "$skills",
              as: "skill",
              cond: { $in: ["$$skill", targetSkills] },
            },
          },
        },
      },
      // will create a new field to find total number of matchingSkills
      {
        $addFields: {
          numMatchingSkills: { $size: "$matchingSkills" },
        },
      },
      {
        $project: {
          password: 0,
          onesignalPlayerId: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
      // this will remove all the connected user
      {
        $match: {
          _id: { $not: { $in: userIdsToExclude } },
        },
      },
      // this s required to make sure more number of matches will be in top
      { $sort: { numMatchingSkills: 1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    res.json({ data: users });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPendingRequests,
  getUserConnections,
  getUserFeed,
};
