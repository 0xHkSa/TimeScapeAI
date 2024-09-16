import express from "express";
import Replicate from "replicate";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const output = await replicate.run(
      "0xhksa/flux-timescape:8aaeebc206942763091f78ac05c3f657be91ad8598f9c06bcaea97a54a34f847",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    console.log("Generated image URL:", output);
    res.json({ imageUrl: output });
  } catch (error: unknown) {
    console.error("Error testing Replicate connection:", error);
    if (error instanceof Error && "response" in error) {
      console.log("Response status:", (error as any).response.status);
      console.log("Response body:", await (error as any).response.text());
    }
    res.status(500).json({ error: "Failed to generate image" });
  }
});

export default router;
