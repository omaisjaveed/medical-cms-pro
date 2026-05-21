import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Media } from "../models/index";

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_PATH || "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export const uploadMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const { originalname, filename, size, mimetype } = req.file;

    // Save to database
    const media = await Media.create({
      filename: originalname,
      url: filename,
      type: mimetype,
      size,
      folder: "images",
    });

    const baseUrl = process.env.API_URL || req.protocol + "://" + req.get("host");
    const mediaUrl = `${baseUrl}/uploads/${filename}`;

    return res.status(201).json({
      success: true,
      data: {
        ...media.toJSON(),
        url: mediaUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const bulkUploadMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const mediaResults = [];
    const baseUrl = process.env.API_URL || req.protocol + "://" + req.get("host");

    for (const file of req.files as Express.Multer.File[]) {
      const { originalname, filename, size, mimetype } = file;

      const media = await Media.create({
        filename: originalname,
        url: filename,
        type: mimetype,
        size,
        folder: "images",
      });

      mediaResults.push({
        ...media.toJSON(),
        url: `${baseUrl}/uploads/${filename}`,
      });
    }

    return res.status(201).json({
      success: true,
      data: mediaResults,
    });
  } catch (error) {
    next(error);
  }
};

export const listMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const media = await Media.findAll({
      order: [["created_at", "DESC"]],
    });

    const baseUrl = process.env.API_URL || req.protocol + "://" + req.get("host");
    const mediaWithUrls = media.map((item: any) => ({
      ...item.toJSON(),
      fullUrl: `${baseUrl}/uploads/${item.url}`, // Use fullUrl instead of overwriting url
    }));

    return res.json({ success: true, data: mediaWithUrls });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const media = await Media.findByPk(id as string) as any;

    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }

    // Delete file from filesystem
    const filePath = path.join(process.env.UPLOAD_PATH || "uploads/", media.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await media.destroy();
    return res.json({ success: true, message: "Media deleted successfully" });
  } catch (error) {
    next(error);
  }
};
