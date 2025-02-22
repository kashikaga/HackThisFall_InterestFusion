"use strict";

var express = require("express");

var cors = require("cors");

var cookieParser = require("cookie-parser");

var rateLimit = require("express-rate-limit");

var connectDB = require("./config/database");

var _require = require("./config/redis"),
    redisClient = _require.redisClient; // Import Redis client


var logger = require("./utils/logger");

var authRouter = require("./routes/auth");

var profileRouter = require("./routes/profile");

var requestRouter = require("./routes/request");

var userRouter = require("./routes/user");

var analyticsLogger = require("./utils/analyticsLogger");

var activity = require("./routes/activity");

var metricsRouter = require("./routes/metrics");

var client = require("prom-client");

var responseTime = require("response-time");

var app = express();
var PORT = process.env.PORT || 7777;
var collectMetrics = client.collectDefaultMetrics;
collectMetrics({
  register: client.register
});
var trackTime = new client.Histogram({
  name: "track_all_req_res_time",
  help: "Tracking all the Request and Responce Time",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000]
}); // To Track total number of Request

var trackTotalRequest = new client.Counter({
  name: "track_total_request",
  help: "This will track total request"
}); // Allowed origins for CORS

var allowedOrigins = ["https://intrest-fusion-frontend.vercel.app", "https://another-frontend.vercel.app", "http://localhost:5173", "http://localhost:3000"]; // Middleware

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(responseTime(function (req, res, time) {
  trackTotalRequest.inc();
  trackTime.labels({
    method: req.method,
    route: req.url,
    status_code: res.statusCode
  }).observe(time);
}));
var apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  // 1 hour
  max: 5000,
  message: "Too many requests, please try again later."
});
app.use(apiLimiter);
app.use(express.json());
app.use(cookieParser());
app.use(analyticsLogger); // Routes

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/api/", activity);
app.use("/", metricsRouter);
app.get("/", function (req, res) {
  res.send("Server is running");
}); // Database and Redis connection, then server initialization

var startServer = function startServer() {
  return regeneratorRuntime.async(function startServer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(connectDB());

        case 3:
          //console.log("✅ Database connection established...");
          logger.info("Database connection established...."); // Initialize Redis connection
          //Uncomment this when you need redis caching
          //redisClient.connect(); // Explicitly connect if using Redis 4.x+

          logger.info("✅ Redis connection established..."); //api check

          app.get("/", function (req, res) {
            res.send("Welcome to Internet Fusion API");
            logger.info("Welcome to Internet Fusion API");
          }); // Start server

          app.listen(PORT, function () {
            logger.info("\uD83D\uDE80 Server is running on port ".concat(PORT, "..."));
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          logger.error("❌ Failed to start the server:", _context.t0.message);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

startServer();
//# sourceMappingURL=index.dev.js.map
