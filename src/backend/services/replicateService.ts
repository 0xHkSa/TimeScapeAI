import Replicate from "replicate";
import { REPLICATE_API_TOKEN } from "../config/env";

const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

export async function generateImage(prompt: string): Promise<string> {
  try {
    const output = await replicate.run(
      "0xhksa/flux-timescape:8aaeebc206942763091f78ac05c3f657be91ad8598f9c06bcaea97a54a34f847",
      {
        input: { prompt },
      }
    );

    return Array.isArray(output)
      ? output[0]
      : typeof output === "object"
      ? JSON.stringify(output)
      : String(output);
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
