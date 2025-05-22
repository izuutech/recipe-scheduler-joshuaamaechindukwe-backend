import { z } from "zod";

export const EventCreateSchema = z.object({
  title: z.string().min(1).max(255),
  eventTime: z.string().datetime(),
  userId: z.string().min(1),
});

export const EventUpdateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  eventTime: z.string().datetime().optional(),
});
