import mongoose, { Schema, Document } from "mongoose";

export interface ImageDocument extends Document {
  filename: string;
  s3Url: string;
  uploadedAt: Date;
}

const ImageSchema: Schema = new Schema({
  filename: { type: String, required: true },
  s3Url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ImageDocument>("Image", ImageSchema);
