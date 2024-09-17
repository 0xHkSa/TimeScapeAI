import Replicate from "replicate";
import { REPLICATE_API_TOKEN } from "../config/env";

const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

export async function generateImage(prompt: string): Promise<string> {
  try {
    const output = await replicate.run(
      "0xhksa/flux-timescape:1ccb087b6fc277f0e3b73f4e78c24ffe438ac262859673475fa3ae96e0e0adde",
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
