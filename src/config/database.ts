import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("connected to MongoDB ✅");
  } catch (error) {
    // REVIEW FIX: Exit the process if DB fails to connect.
    // Running the server without a database causes every request to fail silently.
    console.error("error connecting to MongoDB: ", error);
    process.exit(1);
  }
};

export default connectDB;
