import Replicate from "replicate";
import dotenv from "dotenv";

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateHistoricalImage(prompt: string): Promise<string> {
  try {
    const output = await replicate.run(
      "0xhksa/flux-timescape:8aaeebc2069427630091f78ac05c3f6575a38b396e2a6b4678fe2fe8f3e700d6",
      {
        input: {
          model: "dev",
          prompt: prompt,
          lora_scale: 1,
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "webp",
          guidance_scale: 3.5,
          output_quality: 90,
          prompt_strength: 0.8,
          extra_lora_scale: 1,
          num_inference_steps: 28,
        },
      }
    );

    // URL output
    const imageUrl = Array.isArray(output) ? output[0] : output;

    return imageUrl as string;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
