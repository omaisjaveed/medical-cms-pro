import { Request, Response, NextFunction } from "express";
import { Section } from "../models/index";

export const addSection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pageId } = req.params;
    const section = await Section.create({
      ...req.body,
      page_id: parseInt(pageId as string),
    });

    return res.status(201).json({ success: true, data: section });
  } catch (error) {
    next(error);
  }
};

export const updateSection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const section = await Section.findByPk(id as string);

    if (!section) {
      return res.status(404).json({ success: false, message: "Section not found" });
    }

    await section.update(req.body);
    return res.json({ success: true, data: section });
  } catch (error) {
    next(error);
  }
};

export const deleteSection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const section = await Section.findByPk(id as string);

    if (!section) {
      return res.status(404).json({ success: false, message: "Section not found" });
    }

    await section.destroy();
    return res.json({ success: true, message: "Section deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const reorderSections = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pageId } = req.params;
    const { orders } = req.body; // [{ id: 1, order: 0 }, ...]

    await Promise.all(
      orders.map((item: { id: number; order: number }) =>
        Section.update({ order: item.order }, { where: { id: item.id, page_id: pageId } })
      )
    );

    return res.json({ success: true, message: "Sections reordered successfully" });
  } catch (error) {
    next(error);
  }
};
