import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import { connectToDatabase } from "./config/database.js";
import imageRoutes from "./routes/imageRoutes.js";
import imageGenerationRoutes from "./routes/imageGenerationRoutes.js";
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
app.use("/api/images", imageRoutes);
app.use("/api/images", imageGenerationRoutes);

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
