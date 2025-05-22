import { Request, Response, NextFunction } from "express";
import * as eventModel from "../models/event";
import { EventCreateSchema, EventUpdateSchema } from "../schemas/event";
import createHttpError from "http-errors";

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validated = EventCreateSchema.parse({
      title: req.body.title,
      eventTime: req.body.scheduledTime,
      userId: req.query.userId,
    });
    const event = await eventModel.createEvent({
      user_id: validated.userId,
      title: validated.title,
      event_time: validated.eventTime,
    });
    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    next(createHttpError(400, "Invalid event data"));
  }
};

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") {
      throw createHttpError(400, "User ID is required");
    }

    const events = await eventModel.getEventsByUser(userId);
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id, "sks");
    const validated = EventUpdateSchema.parse(req.body);
    const updates: Partial<{ title: string; event_time: string }> = {};
    if (validated.title) updates.title = validated.title;
    if (validated.eventTime) updates.event_time = validated.eventTime;

    const event = await eventModel.updateEvent(id, updates);
    if (!event) {
      throw createHttpError(404, "Event not found");
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deleted = await eventModel.deleteEvent(id);
    if (!deleted) {
      throw createHttpError(404, "Event not found");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
