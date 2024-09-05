import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";

// load enviorment variables
config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
const MONGODB_URI = process.env.MONGODB_URI as string;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Ensure temp_uploads directory exists
const uploadsDir = path.join(process.cwd(), "temp_uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer file storage -- restructure
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // temp store for image upload testing
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Appends timestamp to filename
  },
});

const upload = multer({ storage: storage });

// Image Schema -- restructure
const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

// Image Model
const Image = mongoose.model("Image", imageSchema);

// Test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Server is running" });
});

// POST upload image -- restructure
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
    });

    await newImage.save();

    res.status(201).json({
      message: "Image uploaded successfully",
      image: {
        id: newImage._id,
        fileName: newImage.filename,
        path: newImage.path,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error uploading image",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// GET all images for DB testing purpsoes
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching images",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
