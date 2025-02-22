const mongoose = require("mongoose");
require("dotenv").config(); // Add this line to load .env variables
// console.log("the mongodb usrl is", process.env.MONGO_URI)
if (!process.env.MONGO_URI) {
  console.log("no env variable")
  process.exit()
}
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDB;
