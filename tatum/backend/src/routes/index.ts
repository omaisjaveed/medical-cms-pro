import express from "express";
import settingsRoutes from "./settingsRoutes";
import pagesRoutes from "./pagesRoutes";
import blogRoutes from "./blogRoutes";
import inquiryRoutes from "./inquiryRoutes";
import authRoutes from "./authRoutes";
import serviceRoutes from "./serviceRoutes";
import galleryRoutes from "./galleryRoutes";
import testimonialRoutes from "./testimonialRoutes";
import mediaRoutes from "./mediaRoutes";

const router = express.Router();

router.use("/settings", settingsRoutes);
router.use("/pages", pagesRoutes);
router.use("/blogs", blogRoutes);
router.use("/inquiries", inquiryRoutes);
router.use("/auth", authRoutes);
router.use("/services", serviceRoutes);
router.use("/gallery", galleryRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/media", mediaRoutes);

export default router;
