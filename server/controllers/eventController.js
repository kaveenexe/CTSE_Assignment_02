const Event = require("../models/eventModel");

// Create new event registration
const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      attendeeFirstName,
      attendeeLastName,
      email,
      contactNumber,
      ticketType,
    } = req.body;

    // Check if required fields are present
    if (
      !eventName ||
      !attendeeFirstName ||
      !attendeeLastName ||
      !email ||
      !contactNumber ||
      !ticketType
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Validate contact number format
    if (!isValidContactNumber(contactNumber)) {
      return res.status(400).json({ error: "Invalid contact number" });
    }

    // Create new event registration
    const event = new Event({
      eventName,
      attendeeFirstName,
      attendeeLastName,
      email,
      contactNumber,
      ticketType,
      ...req.body, // Include other optional fields if present
    });

    // Save the new event registration
    await event.save();

    res
      .status(201)
      .json({ message: "Event registration created successfully", event });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((error) => error.message);
      return res.status(400).json({ message: "Validation Error", errors });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all event registrations
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get event registration by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update event registration by ID
const updateEvent = async (req, res) => {
  try {
    // Validate contact number and email if provided
    const { contactNumber, email } = req.body;
    if (contactNumber && !isValidContactNumber(contactNumber)) {
      return res.status(400).json({ error: "Invalid contact number" });
    }
    if (email && !isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Retrieve the existing event registration
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Update the event registration with the provided data
    Object.assign(event, req.body);

    // Validate the updated event registration
    const validationError = event.validateSync();
    if (validationError) {
      const errors = Object.values(validationError.errors).map(
        (error) => error.message
      );
      return res.status(400).json({ message: "Validation Error", errors });
    }

    // Save the updated event registration to the database
    await event.save();

    // Send success message
    res.status(200).json({ message: "Event registration updated successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete event registration by ID
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    // Send success message along with 200 response
    res
      .status(200)
      .json({ message: "Event registration deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to validate email format
const isValidEmail = (email) => {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate contact number format
const isValidContactNumber = (contactNumber) => {
  // Regular expression to validate contact number format (assuming 10-digit number)
  const contactNumberRegex = /^\d{10}$/;
  return contactNumberRegex.test(contactNumber);
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
