import { Router } from "express";
import * as eventController from "../controllers/events";
import * as deviceController from "../controllers/devices";

const router = Router();

// Event routes
router.post("/api/events", eventController.createEvent);
router.get("/api/events", eventController.getEvents);
router.put("/api/events/:id", eventController.updateEvent);
router.delete("/api/events/:id", eventController.deleteEvent);

// Device routes
router.post("/api/devices", deviceController.registerDevice);

export default router;
