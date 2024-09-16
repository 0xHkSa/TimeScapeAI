import { Request, Response } from "express";
import { uploadImageToS3, getAllImages } from "../services/imageService";
import { AppError } from "../utils/errorHandler";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }

    const result = await uploadImageToS3(req.file);
    res.status(201).json({
      message: "Image uploaded successfully",
      image: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "Error uploading image",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
};

export const getImages = async (req: Request, res: Response) => {
  try {
    const images = await getAllImages();
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching images",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
