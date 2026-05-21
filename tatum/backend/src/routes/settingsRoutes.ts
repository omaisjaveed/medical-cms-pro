import express from "express";
import {
  getSettings,
  updateSetting,
  bulkUpdateSettings,
} from "../controllers/settingsController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Public route (all settings in one object)
router.get("/", getSettings);

// Admin routes (protected)
router.use("/admin", authMiddleware);
router.put("/admin/:key", updateSetting);
router.post("/admin/bulk", bulkUpdateSettings);

export default router;
