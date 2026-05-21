import { Request, Response, NextFunction } from "express";
import { Inquiry } from "../models/index";

export const createInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { formName, data } = req.body;
    const inquiry = await Inquiry.create({ form_name: formName || "contact", data, status: "New" });
    return res.status(201).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

export const listInquiries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inquiries = await Inquiry.findAll({ order: [["created_at", "DESC"]] });
    return res.json({ success: true, data: inquiries });
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByPk(id as string);
    if (!inquiry) return res.status(404).json({ success: false, message: "Inquiry not found" });
    await inquiry.destroy();
    return res.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    next(error);
  }
};

export const replyInquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { reply_content } = req.body;
    const inquiry = await Inquiry.findByPk(id as string);
    if (!inquiry) return res.status(404).json({ success: false, message: "Inquiry not found" });
    
    await inquiry.update({ 
      reply_content,
      status: "Replied"
    });
    
    return res.json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};
