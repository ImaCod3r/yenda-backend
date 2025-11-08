import express from "express";
import { uploadImage, getImage } from "../controllers/imageController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/"}) ;
const router = express.Router();

router.post("/upload", upload.single("photo"), uploadImage);
router.get("/:id", getImage);

export default router;