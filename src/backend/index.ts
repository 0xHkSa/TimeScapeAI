import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";

// load enviorment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
const MONGODB_URI = process.env.MONGODB_URI || "mongo_uri_placeHolder";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Server is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
