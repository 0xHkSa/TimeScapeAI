import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/.env` });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in the environment variables");
  process.exit(1);
}

// Define the Image schema
const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  s3Url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

// Create the Image model
const Image = mongoose.model("Image", imageSchema);

async function testMongoConnection() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected successfully to MongoDB");

    // Test Image model operations
    console.log("Testing Image model operations...");

    // Create and save a test image
    const testImage = new Image({
      filename: "test-image.js",
      s3Url: "https://example.com/test-image.js",
    });
    await testImage.save();
    console.log("Test image saved successfully:", testImage);

    // Fetch all images
    const images = await Image.find();
    console.log("All images in the database:", images);

    // Clean up: remove the test image
    await Image.deleteOne({ _id: testImage._id });
    console.log("Test image removed from the database");
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

testMongoConnection();
