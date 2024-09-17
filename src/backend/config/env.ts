import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../../.env") });

export const PORT = process.env.PORT || 5002;
export const MONGODB_URI = process.env.MONGODB_URI as string;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
export const AWS_SECRET_ACCESS_KEY = process.env
  .AWS_SECRET_ACCESS_KEY as string;
export const AWS_REGION = process.env.AWS_REGION || "us-west-1";
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME as string;
export const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN as string;

// THIRDWEB EXPORTS
export const THIRDWEB_CLIENT_ID = process.env.THIRDWEB_CLIENT_ID || "";
export const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS || "";
export const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS || "";

// Error handling incase of missing keys
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error(
    "AWS credentials are not defined in the environment variables"
  );
}

if (!S3_BUCKET_NAME) {
  throw new Error("S3_BUCKET_NAME is not defined in the environment variables");
}

if (!REPLICATE_API_TOKEN) {
  throw new Error(
    "REPLICATE_API_TOKEN is not defined in the environment variables"
  );
}
