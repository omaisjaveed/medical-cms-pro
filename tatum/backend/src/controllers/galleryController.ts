import { Request, Response, NextFunction } from "express";
import { Gallery } from "../models/index";

export const listGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const galleries = await Gallery.findAll({
      where: { is_active: true },
      order: [["created_at", "DESC"]],
    });
    return res.json({ success: true, data: galleries });
  } catch (error) {
    next(error);
  }
};

export const listAllGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const galleries = await Gallery.findAll({
      order: [["created_at", "DESC"]],
    });
    return res.json({ success: true, data: galleries });
  } catch (error) {
    next(error);
  }
};

export const createGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gallery = await Gallery.create(req.body);
    return res.status(201).json({ success: true, data: gallery });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ success: false, message: "Slug already exists" });
    }
    next(error);
  }
};

export const updateGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findByPk(id as string);

    if (!gallery) {
      return res.status(404).json({ success: false, message: "Gallery not found" });
    }

    await gallery.update(req.body);
    return res.json({ success: true, data: gallery });
  } catch (error) {
    next(error);
  }
};

export const deleteGallery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findByPk(id as string);

    if (!gallery) {
      return res.status(404).json({ success: false, message: "Gallery not found" });
    }

    await gallery.destroy();
    return res.json({ success: true, message: "Gallery deleted successfully" });
  } catch (error) {
    next(error);
  }
};
