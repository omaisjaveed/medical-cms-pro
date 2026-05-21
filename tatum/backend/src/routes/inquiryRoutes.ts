import express from "express";
import { createInquiry, listInquiries, deleteInquiry, replyInquiry } from "../controllers/inquiryController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();
router.post("/", createInquiry);

// Admin routes
router.use(authMiddleware);
router.get("/", listInquiries);
router.delete("/:id", deleteInquiry);
router.post("/:id/reply", replyInquiry);

export default router;
