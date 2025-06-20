import express from "express";
import upload from "../utils/multer.js";
// import {upload media} from utils/cloudinary

const router = express.Router();

router.route("/upload-video").post(upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMedia(req.file.path);
    res.status(200).json({
      success: true,
      message: "Video uploaded successfully.",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error uploading video.",
    });
  }
});

export default router;
