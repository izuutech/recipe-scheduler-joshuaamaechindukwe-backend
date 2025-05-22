import { z } from "zod";

export const DeviceSchema = z.object({
  userId: z.string().min(1),
  pushToken: z.string().min(1),
});
