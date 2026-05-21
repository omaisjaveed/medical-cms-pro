import express from "express";
import {
  listGallery,
  listAllGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", listGallery);
router.get("/all", listAllGallery);

// Admin routes (protected)
router.use("/admin", authMiddleware);
router.post("/admin", createGallery);
router.put("/admin/:id", updateGallery);
router.delete("/admin/:id", deleteGallery);

export default router;
