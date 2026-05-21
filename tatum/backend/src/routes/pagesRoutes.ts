import express from "express";
import {
  getPageBySlug,
  listPages,
  getAllPages,
  createPage,
  updatePage,
  deletePage,
  getPageById,
} from "../controllers/pagesController";
import {
  addSection,
  updateSection,
  deleteSection,
  reorderSections,
} from "../controllers/sectionsController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", listPages);
router.get("/slug/:slug", getPageBySlug);
router.get("/home", getPageBySlug);

// Admin routes (protected)
router.use("/admin", authMiddleware);
router.get("/admin/all", getAllPages);
router.get("/admin/:id", getPageById);
router.post("/admin", createPage);
router.put("/admin/:id", updatePage);
router.delete("/admin/:id", deletePage);

// Section management (protected)
router.post("/admin/:pageId/sections", addSection);
router.put("/admin/sections/:id", updateSection);
router.delete("/admin/sections/:id", deleteSection);
router.post("/admin/:pageId/sections/reorder", reorderSections);

export default router;
