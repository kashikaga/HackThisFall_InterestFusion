// routes/activityRoutes.js
const express = require("express");
const { getActivityLogs, checkHealth } = require("../controllers/activityController");

const router = express.Router();

router.get("/logs", getActivityLogs);
router.get("/health", checkHealth);

module.exports = router;
