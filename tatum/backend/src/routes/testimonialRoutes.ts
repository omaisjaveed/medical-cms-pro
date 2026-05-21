import express from "express";
import {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  reorderTestimonials,
} from "../controllers/testimonialsController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", listTestimonials);

// Admin routes (protected)
router.use("/admin", authMiddleware);
router.get("/admin/all", listTestimonials);
router.post("/admin", createTestimonial);
router.put("/admin/:id", updateTestimonial);
router.delete("/admin/:id", deleteTestimonial);
router.post("/admin/reorder", reorderTestimonials);

export default router;
