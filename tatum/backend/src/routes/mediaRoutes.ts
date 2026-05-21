import express from "express";
import {
  upload,
  uploadMedia,
  bulkUploadMedia,
  listMedia,
  deleteMedia,
} from "../controllers/mediaController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Upload endpoint (protected)
router.post("/upload", authMiddleware, upload.single("file"), uploadMedia);
router.post("/bulk-upload", authMiddleware, upload.array("files", 10), bulkUploadMedia);

// Public list (for admin to browse)
router.get("/", authMiddleware, listMedia);

// Delete (protected)
router.delete("/:id", authMiddleware, deleteMedia);

export default router;
