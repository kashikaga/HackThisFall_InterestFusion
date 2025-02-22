// routes/requestRoutes.js
const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { sendConnectionRequest, reviewConnectionRequest } = require("../controllers/requestController");

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, sendConnectionRequest);
router.post("/request/review/:status/:requestId", userAuth, reviewConnectionRequest);

module.exports = router;
