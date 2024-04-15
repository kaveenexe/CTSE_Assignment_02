const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// Routes for Event CRUD operations
router.get("/", eventController.getAllEvents);
router.get("/get/:id", eventController.getEventById);
router.post("/create", eventController.createEvent);
router.put("/update/:id", eventController.updateEvent);
router.delete("/delete/:id", eventController.deleteEvent);

module.exports = router;
