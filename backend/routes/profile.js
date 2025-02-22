// routes/profileRoutes.js
const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { viewProfile, editProfile, addAvatar } = require("../controllers/profileController");
const multer = require("multer");

const router = express.Router();
const upload = multer({storage:multer.memoryStorage()});

// Profile Routes
router.get("/profile/view", userAuth, viewProfile);
router.patch("/profile/edit", userAuth, editProfile);
router.post("/profile/addAvatar", userAuth, upload.single("avatar"), addAvatar);

module.exports = router;
