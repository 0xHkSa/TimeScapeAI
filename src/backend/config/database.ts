import mongoose from "mongoose";
import { MONGODB_URI } from "./env.js";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 60000,
      maxPoolSize: 10,
      family: 4,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
