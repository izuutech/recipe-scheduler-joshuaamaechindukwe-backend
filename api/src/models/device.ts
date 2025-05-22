import db from "../config/database";

export interface Device {
  id: string;
  user_id: string;
  push_token: string;
  created_at: string;
}

export const upsertDeviceToken = async (
  device: Omit<Device, "id" | "created_at">
) => {
  const [existing] = await db<Device>("devices").where({
    user_id: device.user_id,
  });

  if (existing) {
    const [updated] = await db<Device>("devices")
      .where({ user_id: device.user_id })
      .update({ push_token: device.push_token })
      .returning("*");
    return updated;
  }

  const [created] = await db<Device>("devices").insert(device).returning("*");
  return created;
};

export const getDeviceByUser = async (userId: string) => {
  return db<Device>("devices").where({ user_id: userId }).first();
};
