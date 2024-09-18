import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3";
import { S3_BUCKET_NAME } from "../config/env";
import { upload } from "thirdweb/storage";
import { createThirdwebClient } from "thirdweb";
import { THIRDWEB_CLIENT_ID } from "../config/env";
import { generateImage } from "./replicateService";
import Image from "../models/Image";
import fs from "fs";

const thirdwebClient = createThirdwebClient({
  clientId: THIRDWEB_CLIENT_ID,
});

// storing user upload to s3
export const uploadImageToS3 = async (file: Express.Multer.File) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}-${file.originalname}`,
    Body: fileStream,
  };

  const command = new PutObjectCommand(uploadParams);
  await s3Client.send(command);

  return `https://${S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
};

// store return image to THIRDWEB > IPFS
export const uploadImageToThirdWeb = async (
  imageUrl: string
): Promise<string> => {
  // Fetch the image from the URL
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const file = new File([blob], "generated-image.webp", { type: "image/webp" });

  const uri = await upload({
    client: thirdwebClient,
    files: [file],
  });

  console.log("Uploaded image URI: ", uri);
  return uri;
};

// -- Main Function
export const processUploadedImage = async (file: Express.Multer.File) => {
  try {
    // Uploads user image to S3
    const s3Result = await uploadImageToS3(file);

    // Generate new image using Replicate "hardCode for now"
    const generatedImageUrl = await generateImage(
      "iolani palace during the 1950's during a parade"
    );

    // Store replicate response to IPFS
    const ipfsUri = await uploadImageToThirdWeb(generatedImageUrl);

    // Database Update
    const newImage = new Image({
      fileName: file.originalname,
      s3Url: s3Result,
      generatedImageUrl: generatedImageUrl,
      ipfsUri: ipfsUri,
    });
    await newImage.save();

    return {
      id: newImage._id,
      filename: newImage.filename,
      s3Url: newImage.s3Url,
      generatedImageUrl: newImage.generatedImageUrl,
      ipfsUri: newImage.ipfsUri,
      uploadedAt: newImage.uploadedAt,
    };
  } catch (error) {
    console.error("Error processing uploaded image:", error);
    throw error;
  }
};

export const getAllImages = async () => {
  return Image.find();
};
