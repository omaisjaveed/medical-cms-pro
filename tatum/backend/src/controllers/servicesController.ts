import { Request, Response, NextFunction } from "express";
import { Service } from "../models/index";

export const listServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { include_draft = "false" } = req.query;
    const whereClause = include_draft === "true" ? {} : { status: "Published" };

    const services = await Service.findAll({
      where: whereClause,
      order: [["order", "ASC"], ["title", "ASC"]],
    });

    return res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

export const getServiceTree = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all published services
    const services = await Service.findAll({
      where: { status: "Published" },
      order: [["order", "ASC"], ["id", "ASC"]],
    });

    // Build the tree manually from the flat list
    const buildTree = (parentId: number | null = null): any => {
      return services
        .filter((s: any) => s.parent_id === parentId)
        .map((s: any) => ({
          ...s.get({ clone: true }), // Use .get() to get plain object
          children: buildTree(s.id),
        }));
    };

    const tree = buildTree(null);
    return res.json({ success: true, data: tree });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await Service.create(req.body);
    return res.status(201).json({ success: true, data: service });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ success: false, message: "Slug already exists" });
    }
    next(error);
  }
};

export const updateService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id as string);

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    await service.update(req.body);
    return res.json({ success: true, data: service });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ success: false, message: "Slug already exists" });
    }
    next(error);
  }
};

export const deleteService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id as string);

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    // Check for children before deleting
    const childrenCount = await Service.count({ where: { parent_id: id as string } });
    if (childrenCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete service with ${childrenCount} child service(s). Delete children first.`,
      });
    }

    await service.destroy();
    return res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const reorderServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orders } = req.body; // [{ id: 1, order: 0 }, { id: 2, order: 1 }]

    await Promise.all(
      orders.map((item: { id: number; order: number }) =>
        Service.update({ order: item.order }, { where: { id: item.id } })
      )
    );

    return res.json({ success: true, message: "Services reordered successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllServicesWithHierarchy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await Service.findAll({
      order: [["order", "ASC"]],
    });

    const buildTree = (parentId: number | null = null): any => {
      return services
        .filter((s: any) => s.parent_id === parentId)
        .map((s: any) => ({
          ...s.toJSON(),
          children: buildTree(s.id),
        }));
    };

    const tree = buildTree(null);
    return res.json({ success: true, data: tree });
  } catch (error) {
    next(error);
  }
};
