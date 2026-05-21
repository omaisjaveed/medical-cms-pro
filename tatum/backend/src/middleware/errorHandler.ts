import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ success: false, message });
};

export default errorHandler;
