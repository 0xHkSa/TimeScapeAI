import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3";
import { S3_BUCKET_NAME } from "../config/env";
import { upload } from "thirdweb/storage";
import { createThirdwebClient } from "thirdweb";
import { THIRDWEB_CLIENT_ID } from "../config/env";
import Image from "../models/Image";
import fs from "fs";

// storing user uplaod to s3
export const uploadImageToS3 = async (file: Express.Multer.File) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}-${file.originalname}`,
    Body: fileStream,
  };

  const command = new PutObjectCommand(uploadParams);
  await s3Client.send(command);

  const s3Url = `https://${S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

  const newImage = new Image({
    filename: file.originalname,
    s3Url: s3Url,
  });

  await newImage.save();

  return {
    id: newImage._id,
    fileName: newImage.filename,
    s3Url: newImage.s3Url,
  };
};

// store return image to THIRDWEB > IPFS
export async function uploadImageToThirdWeb(imageUrl: string) {
  const client = createThirdwebClient({
    clientId: THIRDWEB_CLIENT_ID,
  });

  // Fetch the image from the URL
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const file = new File([blob], "generated-image.webp", { type: "image/webp" });

  const uri = await upload({
    client,
    files: [file],
  });

  console.log("Uploaded image URI: ", uri);
  return uri;
}

export const getAllImages = async () => {
  return Image.find();
};
