const express = require("express");
const http = require("http"); // Import HTTP to attach WebSocket
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/database");
const { redisClient } = require("./config/redis");
const logger = require("./utils/logger");
const errorHandler = require("./middlewares/errorhandler");
const authRouter = require("./routes/auth");
const fusionRouter = require("./routes/fusionComm.route");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const analyticsLogger = require("./utils/analyticsLogger");
const activity = require("./routes/activity");
const metricsRouter = require("./routes/metrics");
const client = require("prom-client");
const responseTime = require("response-time");
const { Server } = require("socket.io");
const {
  addToUserOnlineEvent,
} = require("./socket_listeners/addToUserOnlineEvent");
const sendMessageEvent = require("./socket_listeners/sendMessageEvent");
const disconnectEvent = require("./socket_listeners/disconnectEvent");
const eventRouter = require("./routes/fusionEvent.routes");
const groupRouter = require("./routes/fusionGrouprouter");

const app = express();
const PORT = process.env.PORT || 7777;

// Create HTTP server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin and my frontend port = 5173
    methods: ["GET", "POST"], // Allow these HTTP methods
    credentials: true,
  },
});
// Middleware and Routes (your existing code remains unchanged)
app.use(
  cors({
    origin: [
      "https://intrest-fusion-frontend.vercel.app",
      "https://another-frontend.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
      "*"
    ],
    credentials: true,
  })
);

/**
 * List of events
 * Connection - will be connected to socket
 * add_to_user_online - This will add this userId to onlineUser
 * send_message - This has 3 params ,This will check if toUserId is in onlineUser
                  If userId2/toUserId is also in onlineUser
                    then - will create a new room for this 2 users
                    else - will send a notification to userId2
                  default - add message to DB      
 * disconnect -remove user from usersSocketData and all the rooms that they are part of because now there will be only 2 in room         
 * 
 * Why we are using redis for Chat System?
 * Getting data from redis is easy than a normal DB.
 * We are redis for :
 *    -To store data of user corresponding to socketId
 *    -The data of rooms and users in that room
 *  
 */
io.on("connection", (socket) => {
  console.log("User connected ", socket.id);

  socket.on("add_to_user_online", (userId) =>
    addToUserOnlineEvent(socket, userId)
  );
  socket.on("send_message", (data) => sendMessageEvent(io, socket, data));

  socket.on("disconnect", () => disconnectEvent(socket));
});

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5000,
  message: "Too many requests, please try again later.",
});
app.use(apiLimiter);
app.use(express.json());
app.use(cookieParser());
app.use(analyticsLogger);
app.use('/test',async (req,res) => {
  res.send("interestfusion server running")
})
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/api/", activity);
app.use("/", metricsRouter);
app.use("/",fusionRouter)
app.use('/',eventRouter)
app.use('/',groupRouter)
app.use(errorHandler);

// Database connection and server start
const startServer = async () => {
  try {
    await connectDB();
    logger.info("Database connection established...");
    await redisClient.connect();
    // [usersSocketData] will only contain data of user corresponding to socketId
    // "UserId":"SocketId"
    // with this we can also do like check if user is online

    const isExistsUsersSocketData = await redisClient.get("usersSocketData");
    // [allRoomData] will contain all the data of rooms and users in that room
    /**
    {
      roomId: [{
          socketId:"",
          userId:""
        }]
        
    }
    */
    const isExistsAllRoomData = await redisClient.get("allRoomData");

    if (isExistsUsersSocketData == null) {
      await redisClient.set("usersSocketData", JSON.stringify({}));
    }
    if (isExistsAllRoomData == null) {
      await redisClient.set("allRoomData", JSON.stringify({}));
    }

    logger.info("Redis connection established...");

    // Start the server with WebSocket
    server.listen(PORT, () => {
      logger.info(`🚀 Server is running on port ${PORT}...`);
    });
  } catch (err) {
    logger.error("❌ Failed to start the server:", err.message);
  }
};

startServer();
