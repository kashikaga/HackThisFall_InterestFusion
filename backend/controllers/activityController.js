// controllers/activityController.js
const ActivityLog = require("../models/ActivityLog");
const mongoose = require("mongoose");
const { redisClient } = require("../config/redis");
const { z } = require("zod");

// Schema validation for logs query parameters
const logsQuerySchema = z.object({
  endpoint: z.string().optional(),
  method: z
    .string()
    .refine((val) => val === "GET", {
      message: "Only GET method is allowed",
    })
    .optional(),
});

// Fetch activity logs (filtered by endpoint and method)
const getActivityLogs = async (req, res,next) => {
  try {
    const { endpoint, method } = req.query; // Optional query params
    const query = {};
    if (endpoint) query.endpoint = endpoint;
    if (method) query.method = method;

    const logSchemaValidate = logsQuerySchema.safeParse(query);
    if (!logSchemaValidate.success) {
      return res
        .status(400)
        .json({ message: "Validation Failed: " + logSchemaValidate.error });
    }

    const logs = await ActivityLog.find(query).sort({ timestamp: -1 }); // Most recent first
    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};

// Check system health (MongoDB & Redis)
const checkHealth = (req, res) => {
  let mongoDbConnectionStatus = mongoose.connection.readyState;
  let redisConnectionStatus = redisClient.isReady;

  const response = {
    message:
      mongoDbConnectionStatus === 1 && redisConnectionStatus
        ? "Both MongoDB and Redis are operational."
        : "There is an issue with connections.",
    mongoDB:
      mongoDbConnectionStatus === 1
        ? "MongoDB is operational."
        : "MongoDB is not operational.",
    redis: redisConnectionStatus
      ? "Redis is operational."
      : "Redis is not operational.",
  };

  res.status(mongoDbConnectionStatus === 1 && redisConnectionStatus ? 200 : 500).json(response);
};

module.exports = {
  getActivityLogs,
  checkHealth,
};
