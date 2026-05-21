import express from "express";
import {
  listBlogPosts,
  getBlogPost,
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", listBlogPosts);
router.get("/:slug", getBlogPost);

// Admin routes (protected)
router.use("/admin", authMiddleware);
router.get("/admin/all", getAllBlogPosts);
router.post("/admin", createBlogPost);
router.put("/admin/:id", updateBlogPost);
router.delete("/admin/:id", deleteBlogPost);

export default router;
