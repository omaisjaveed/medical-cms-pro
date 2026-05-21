import { Request, Response, NextFunction } from "express";
import { Testimonial } from "../models/index";

export const listTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { active_only = "true" } = req.query;
    const whereClause = active_only === "true" ? { is_active: true } : {};

    const testimonials = await Testimonial.findAll({
      where: whereClause,
      order: [["order", "ASC"], ["created_at", "DESC"]],
    });
    return res.json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    return res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id as string);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    await testimonial.update(req.body);
    return res.json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id as string);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    await testimonial.destroy();
    return res.json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const reorderTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orders } = req.body;

    await Promise.all(
      orders.map((item: { id: number; order: number }) =>
        Testimonial.update({ order: item.order }, { where: { id: item.id } })
      )
    );

    return res.json({ success: true, message: "Testimonials reordered successfully" });
  } catch (error) {
    next(error);
  }
};
