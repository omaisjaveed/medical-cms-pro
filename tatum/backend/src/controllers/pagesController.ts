import { Request, Response, NextFunction } from "express";
import { Page, Section } from "../models/index";

export const getPageBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { slug } = req.params;
    if (slug === "home") {
      const homePage = await Page.findOne({
        where: { status: "Published" },
        order: [["id", "ASC"]],
        include: [{ model: Section, as: "sections" }],
      });
      if (!homePage) {
        return res.status(404).json({ success: false, message: "No published pages found" });
      }
      return res.json({ success: true, data: homePage });
    }
    const page = await Page.findOne({
      where: { slug, status: "Published" },
      include: [{ model: Section, as: "sections" }],
      order: [[{ model: Section, as: "sections" }, "order", "ASC"]],
    });
    if (!page) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }
    return res.json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
};

export const listPages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pages = await Page.findAll({
      where: { status: "Published" },
      order: [["id", "ASC"]],
      attributes: ["id", "slug", "title", "status"],
    });
    return res.json({ success: true, data: pages });
  } catch (error) {
    next(error);
  }
};

export const getAllPages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pages = await Page.findAll({
      include: [{ model: Section, as: "sections" }],
      order: [["id", "ASC"]],
    });
    return res.json({ success: true, data: pages });
  } catch (error) {
    next(error);
  }
};

export const createPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sections, ...pageData } = req.body;
    const page = await Page.create(pageData) as any;

    if (sections && Array.isArray(sections)) {
      await Section.bulkCreate(
        sections.map((sec: any) => ({
          ...sec,
          page_id: page.id,
        }))
      );
    }

    const createdPage = await Page.findByPk(page.id, {
      include: [{ model: Section, as: "sections" }],
    });

    return res.status(201).json({ success: true, data: createdPage });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ success: false, message: "Slug already exists" });
    }
    next(error);
  }
};

export const updatePage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { sections, ...pageData } = req.body;

    const page = await Page.findByPk(id as string);
    if (!page) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    await page.update(pageData);

    if (sections && Array.isArray(sections)) {
      await Section.destroy({ where: { page_id: id as string } });
      await Section.bulkCreate(
        sections.map((sec: any) => ({
          ...sec,
          page_id: id,
        }))
      );
    }

    const updatedPage = await Page.findByPk(id as string, {
      include: [{ model: Section, as: "sections" }],
    });

    return res.json({ success: true, data: updatedPage });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ success: false, message: "Slug already exists" });
    }
    next(error);
  }
};

export const deletePage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const page = await Page.findByPk(id as string);

    if (!page) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    await page.destroy();
    return res.json({ success: true, message: "Page deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getPageById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const page = await Page.findByPk(id as string, {
      include: [{ model: Section, as: "sections" }],
    });
    if (!page) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }
    return res.json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
};
