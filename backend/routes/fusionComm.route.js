const express = require("express");
const { fusionRegister, fusionSignup, fusionPublishpost,fusionAuth, getFusionPost } = require("../controllers/fusionComm.controller");

const router = express.Router();

// User registration
router.post("/fusionregister", fusionRegister);

// User login
router.post("/fusionlogin", fusionSignup);

// Publish a new post
router.post("/fusionpublish", fusionPublishpost);


//authentication
router.post("/fusionauth", fusionAuth);

router.get("/getposts", getFusionPost);
module.exports = router;
