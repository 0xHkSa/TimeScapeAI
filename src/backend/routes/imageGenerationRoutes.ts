import express from "express";
import { generateImageController } from "../controllers/imageGenerationController";

const router = express.Router();

router.post("/generate", generateImageController);

// router.post("/generate", async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     const imageUrl = await generateImage(prompt);
//     res.json({ imageUrl });
//   } catch (error) {
//     console.error("Image generation error:", error);
//     res.status(500).json({ error: "Failed to generate image" });
//   }
// });

export default router;
