import { Request, Response, NextFunction } from "express";
import { BlogPost, User } from "../models/index";

export const listBlogPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await BlogPost.findAll({
      where: { status: "Published" },
      order: [["published_at", "DESC"]],
      attributes: ["id", "title", "slug", "excerpt", "featured_image", "published_at", "tags"],
    });
    return res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const getBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({
      where: { slug, status: "Published" },
      include: [{ model: User, as: "author", attributes: ["id", "name", "email"] }],
    });
    if (!post) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    return res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const getAllBlogPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await BlogPost.findAll({
      include: [{ model: User, as: "author", attributes: ["id", "name", "email"] }],
      order: [["created_at", "DESC"]],
    });
    return res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const createBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { author_id, ...blogData } = req.body;
    const post = await BlogPost.create({
      ...blogData,
      author_id: (req as any).user?.id, // Get from authenticated user
      published_at: blogData.status === "Published" ? new Date() : null,
    }) as any;

    const createdPost = await BlogPost.findByPk(post.id, {
      include: [{ model: User, as: "author", attributes: ["id", "name", "email"] }],
    });

    return res.status(201).json({ success: true, data: createdPost });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ success: false, message: "Slug already exists" });
    }
    next(error);
  }
};

export const updateBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id as string) as any;

    if (!post) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    const updateData = { ...req.body };
    if (updateData.status === "Published" && post.status !== "Published") {
      updateData.published_at = new Date();
    }

    await post.update(updateData);

    const updatedPost = await BlogPost.findByPk(id as string, {
      include: [{ model: User, as: "author", attributes: ["id", "name", "email"] }],
    });

    return res.json({ success: true, data: updatedPost });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ success: false, message: "Slug already exists" });
    }
    next(error);
  }
};

export const deleteBlogPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id as string);

    if (!post) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    await post.destroy();
    return res.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
