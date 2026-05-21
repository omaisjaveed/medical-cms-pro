import { Request, Response, NextFunction } from "express";
import models from "../models/index";

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await models.Setting.findAll();
    const payload = settings.reduce((acc: Record<string, any>, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, any>);
    return res.json({ success: true, data: payload });
  } catch (error) {
    next(error);
  }
};

export const updateSetting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params;
    const setting = await models.Setting.findOne({ where: { key } });

    if (!setting) {
      return res.status(404).json({ success: false, message: "Setting not found" });
    }

    await setting.update({ value: req.body.value });
    return res.json({ success: true, data: setting });
  } catch (error) {
    next(error);
  }
};

export const bulkUpdateSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { settings } = req.body; // Array of { key, value }

    await Promise.all(
      settings.map((item: { key: string; value: any }) =>
        models.Setting.upsert({
          key: item.key,
          value: item.value,
        })
      )
    );

    // Return all settings
    const allSettings = await models.Setting.findAll();
    const payload = allSettings.reduce((acc: Record<string, any>, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, any>);

    return res.json({ success: true, data: payload });
  } catch (error) {
    next(error);
  }
};
