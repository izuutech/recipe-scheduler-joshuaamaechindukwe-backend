import { Request, Response, NextFunction } from "express";
import * as deviceModel from "../models/device";
import { DeviceSchema } from "../schemas/device";
import createHttpError from "http-errors";

export const registerDevice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validated = DeviceSchema.parse(req.body);
    const device = await deviceModel.upsertDeviceToken({
      user_id: validated.userId,
      push_token: validated.pushToken,
    });
    res.status(201).json(device);
  } catch (error) {
    next(createHttpError(400, "Invalid device data"));
  }
};
