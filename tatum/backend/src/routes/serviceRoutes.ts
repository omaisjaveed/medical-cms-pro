import express from "express";
import {
  listServices,
  getServiceTree,
  createService,
  updateService,
  deleteService,
  reorderServices,
  getAllServicesWithHierarchy,
} from "../controllers/servicesController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", listServices);
router.get("/tree", getServiceTree);

// Admin routes (protected)
router.use("/admin", authMiddleware);
router.post("/admin", createService);
router.put("/admin/:id", updateService);
router.delete("/admin/:id", deleteService);
router.post("/admin/reorder", reorderServices);
router.get("/admin/all", getAllServicesWithHierarchy);

export default router;
