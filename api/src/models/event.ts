import db from "../config/database";

export interface Event {
  id: string;
  user_id: string;
  title: string;
  event_time: string;
  created_at: string;
}

// This type should match the insertable structure
export type NewEvent = Omit<Event, "id" | "created_at">;

import { v4 as uuidv4 } from "uuid";

export const createEvent = async (
  eventData: Omit<Event, "id" | "created_at">
): Promise<Event> => {
  try {
    // Generate a new UUID for the event
    const eventId = uuidv4();

    // Insert the new event with all required fields
    const [created] = await db<Event>("events")
      .insert({
        id: eventId, // Include the generated UUID
        ...eventData,
        created_at: db.fn.now(), // Explicit creation timestamp
      })
      .returning("*"); // Returns all columns of the inserted row

    if (!created) {
      throw new Error("Event creation failed - no record returned");
    }

    return created;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
};

export const getEventsByUser = async (userId: string): Promise<Event[]> => {
  return db<Event>("events")
    .where({ user_id: userId })
    .andWhere("event_time", ">", new Date().toISOString())
    .orderBy("event_time", "asc");
};

export const updateEvent = async (
  id: string,
  updates: Partial<Omit<Event, "id" | "created_at">>
): Promise<Event> => {
  const [updated] = await db<Event>("events")
    .where({ id })
    .update(updates)
    .returning("*");
  if (!updated) throw new Error("Failed to update event");
  return updated;
};

export const deleteEvent = async (id: string): Promise<any> => {
  return db<Event>("events").where({ id }).del();
};
