import express from "express";
import { uploadImage, getImages } from "../controllers/imageControllers";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getImages);

export default router;
