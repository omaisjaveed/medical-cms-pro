import { Request, Response, NextFunction } from "express";

const apiPrefix = (req: Request, res: Response, next: NextFunction) => {
  const prefix = process.env.APP_BASE_PATH || "/tatumwellness-api";
  if (req.url.startsWith(prefix)) {
    req.url = req.url.substring(prefix.length) || "/";
  }
  return next();
};

export default apiPrefix;
