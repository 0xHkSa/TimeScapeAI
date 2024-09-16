import Replicate from "replicate";
import dotenv from "dotenv";

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function testReplicateConnection() {
  try {
    const output = await replicate.run(
      "0xhksa/flux-timescape:8aaeebc206942763091f78ac05c3f657be91ad8598f9c06bcaea97a54a34f847",
      {
        input: {
          prompt: "iolani palace 100 years ago during a parade",
        },
      }
    );

    console.log("Generated image URL:", output);
  } catch (error) {
    console.error("Error testing Replicate connection:", error);
    if (error.response) {
      console.log("Response status:", error.response.status);
      console.log("Response body:", await error.response.text());
    }
  }
}

testReplicateConnection();

// TEST LATEST REPLICATE MODEL
// async function testReplicateConnection() {
//   try {
//     const output = await replicate.run(
//       "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
//       {
//         input: {
//           prompt: "iolani palace 100 years ago during a parade",
//         },
//       }
//     );

//     console.log("Generated image URL:", output);
//   } catch (error) {
//     console.error("Error testing Replicate connection:", error.message);
//   }
// }

// testReplicateConnection();
