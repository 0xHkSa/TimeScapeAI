import { Request, Response } from "express";
import { generateImage } from "../services/replicateService";
import { uploadImageToThirdWeb } from "../services/imageService";

export const generateImageController = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const imageUrl = await generateImage(prompt);

    // Upload to IPFS
    const ipfsUri = await uploadImageToThirdWeb(imageUrl);

    res.json({ imageUrl, ipfsUri });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
};
