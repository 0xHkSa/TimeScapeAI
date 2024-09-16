import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3";
import { S3_BUCKET_NAME } from "../config/env";
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

// do we need a new s3 bucket to pull from
// strore result image to s3 from replicate result
// export const uplaodReplicateImage = async (file: Express.Multer.File) => {
//   const fileStream = fs.createReadStream(file.path);
//   const uploadParams = {
//     Bucket: S3_BUCKET_NAME,
//     Key: `uploads/${Date.now()}-${file.originalname}`,
//     Body: fileStream,
//   };

//   const command = new PutObjectCommand(uploadParams);
//   await s3Client.send(command);

//   const s3url =
// };

export const getAllImages = async () => {
  return Image.find();
};