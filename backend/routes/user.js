// routes/userRoutes.js
const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { getPendingRequests, getUserConnections, getUserFeed } = require("../controllers/userController");

const router = express.Router();

router.get("/user/requests/received", userAuth, getPendingRequests);
router.get("/user/connections", userAuth, getUserConnections);
router.get("/feed", userAuth, getUserFeed);

module.exports = router;
