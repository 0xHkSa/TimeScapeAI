import Replicate from "replicate";
import { REPLICATE_API_TOKEN } from "../config/env";

const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

interface ReplicateOutput {
  output?: string[];
}

function isReplicateOutput(output: unknown): output is ReplicateOutput {
  return typeof output === "object" && output !== null && "output" in output;
}

export async function generateImage(prompt: string): Promise<string> {
  try {
    const output = await replicate.run(
      "0xhksa/flux-timescape:1ccb087b6fc277f0e3b73f4e78c24ffe438ac262859673475fa3ae96e0e0adde",
      {
        input: { prompt },
      }
    );

    if (Array.isArray(output) && output.length > 0) {
      return output[0];
    } else if (
      isReplicateOutput(output) &&
      Array.isArray(output.output) &&
      output.output.length > 0
    ) {
      return output.output[0];
    } else {
      throw new Error("Unexpected output format from Replicate API");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
