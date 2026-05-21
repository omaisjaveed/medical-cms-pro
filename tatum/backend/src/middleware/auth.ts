import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "supersecretjwtkey";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    (req as any).user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

export const requireSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user?.role !== "SuperAdmin") {
    return res.status(403).json({
      success: false,
      message: "SuperAdmin privileges required"
    });
  }
  next();
};

export const requireAdminOrSuper = (req: Request, res: Response, next: NextFunction) => {
  if (!["SuperAdmin", "Admin"].includes((req as any).user?.role || "")) {
    return res.status(403).json({
      success: false,
      message: "Admin privileges required"
    });
  }
  next();
};
