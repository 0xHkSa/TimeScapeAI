import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import { connectToDatabase } from "./config/database.js";
import { processUploadedImage } from "./services/imageService.js";
import { upload } from "./middleware/upload.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post("/api/images/upload", upload.single("image"), async (req, res) => {
  try {
    console.log("Received file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await processUploadedImage(req.file);
    console.log("processUploadImage result:", result);

    res.json(result);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Failed to process image" });
  }
});

// Error handling middleware
app.use(errorHandler);

// Connect to database and start server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });

export default app;
