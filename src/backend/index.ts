import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

const uploadsDir = path.join(process.cwd(), "temp_uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../../.env` });
const app = express();
const PORT = process.env.PORT || 5002;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MongoDB Connection Setup
const MONGODB_URI = process.env.MONGODB_URI as string;

const connectWithRetry = () => {
  mongoose
    .connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 60000,
      maxPoolSize: 10,
      family: 4,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      // Start the server only after successful connection
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

// Configure S3 client
const s3Client = new S3Client({
  region: "us-west-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in the environment variables");
  process.exit(1);
}

console.log("Attempting to connect to MongoDB...");
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 60000, // Increase to 60 seconds
    socketTimeoutMS: 45000, // Socket timeout
    connectTimeoutMS: 60000, // Connection timeout
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server only after successful connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
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
  s3Url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

// Image Model
const Image = mongoose.model("Image", imageSchema);

// Test route
app.get("/api/hello", async (req, res) => {
  try {
    console.log("Attempting to create test image");
    const testImage = new Image({
      filename: "hello-test-image.jpg",
      s3Url: "https://example.com/hello-test-image.jpg",
    });

    console.log("Saving test image to database");
    await testImage.save();

    console.log("Test image saved successfully");
    res.json({
      message: "Server is running and database write successful",
      testImage: {
        id: testImage._id,
        fileName: testImage.filename,
        s3Url: testImage.s3Url,
      },
    });
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({
      message: "Server is running but database write failed",
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
});
// POST upload image -- restructure
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    console.log("Received upload request");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileStream = fs.createReadStream(req.file.path);
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `uploads/${Date.now()}-${req.file.originalname}`,
      Body: fileStream,
    };

    console.log("Uploading to S3 with params:", uploadParams);

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

    console.log("S3 upload successful. URL:", s3Url);

    const newImage = new Image({
      filename: req.file.originalname,
      s3Url: s3Url,
    });

    console.log("Attempting to save image to MongoDB:", newImage);

    await newImage.save();
    console.log("Image saved to database");

    res.status(201).json({
      message: "Image uploaded successfully",
      image: {
        id: newImage._id,
        fileName: newImage.filename,
        s3Url: newImage.s3Url,
      },
    });
  } catch (error) {
    console.error("Detailed error:", error);
    if (error instanceof mongoose.Error.MongooseServerSelectionError) {
      res.status(500).json({
        message: "Unable to connect to the database. Please try again later.",
        error: "Database connection error",
      });
    } else {
      res.status(500).json({
        message: "Error uploading image",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
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

export default app;
