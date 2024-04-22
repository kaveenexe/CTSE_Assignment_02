const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event Management Operations
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Retrieve all events
 *     description: Returns a list of all events.
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: A list of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   eventName:
 *                     type: string
 *                   attendeeFirstName:
 *                     type: string
 *                   attendeeLastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   contactNumber:
 *                     type: string
 *                   address:
 *                     type: string
 *                   ticketType:
 *                     type: string
 *                     enum: [Regular, VIP, Student]
 *                   registrationDate:
 *                     type: string
 *                     format: date-time
 *                   paymentStatus:
 *                     type: string
 *                     enum: [Paid, Pending, Refunded]
 *                   registrationStatus:
 *                     type: string
 *                     enum: [Confirmed, Waitlisted, Cancelled]
 *                   specialRequests:
 *                     type: string
 *               example:
 *                 - _id: "661a7a70f5b8c34f1b1d78b9"
 *                   eventName: "Film Screening"
 *                   attendeeFirstName: "Maleesha"
 *                   attendeeLastName: "Shashindi"
 *                   email: "maleeshas.2000@gmail.com"
 *                   contactNumber: "0713970808"
 *                   address: "Kandy, Sri Lanka"
 *                   ticketType: "Student"
 *                   paymentStatus: "Pending"
 *                   registrationStatus: "Confirmed"
 *                   specialRequests: "Front Seat"
 *                   registrationDate: "2024-04-13T12:28:32.619Z"
 *                 - _id: "661a8bb0f5b8c34f1b1d7911"
 *                   eventName: "Music Concert"
 *                   attendeeFirstName: "Alice"
 *                   attendeeLastName: "Smith"
 *                   email: "alice.smith@example.com"
 *                   contactNumber: "9876543210"
 *                   address: "456 Concert Ave, Music City"
 *                   ticketType: "VIP"
 *                   registrationDate: "2022-04-15T12:00:00.000Z"
 *                   paymentStatus: "Pending"
 *                   registrationStatus: "Confirmed"
 *                   specialRequests: "Seating preference: Front row"
 */

/**
 * @swagger
 * /api/events/get/{id}:
 *   get:
 *     summary: Retrieve an event by ID
 *     description: Returns an event based on its unique identifier.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The event object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 eventName:
 *                   type: string
 *                 attendeeFirstName:
 *                   type: string
 *                 attendeeLastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 contactNumber:
 *                   type: string
 *                 address:
 *                   type: string
 *                 ticketType:
 *                   type: string
 *                   enum: [Regular, VIP, Student]
 *                 registrationDate:
 *                   type: string
 *                   format: date-time
 *                 paymentStatus:
 *                   type: string
 *                   enum: [Paid, Pending, Refunded]
 *                 registrationStatus:
 *                   type: string
 *                   enum: [Confirmed, Waitlisted, Cancelled]
 *                 specialRequests:
 *                   type: string
 *               example:
 *                 _id: "661a7a70f5b8c34f1b1d78b9"
 *                 eventName: "Film Screening"
 *                 attendeeFirstName: "Maleesha"
 *                 attendeeLastName: "Shashindi"
 *                 email: "maleeshas.2000@gmail.com"
 *                 contactNumber: "0713970808"
 *                 address: "Kandy, Sri Lanka"
 *                 ticketType: "Student"
 *                 paymentStatus: "Pending"
 *                 registrationStatus: "Confirmed"
 *                 specialRequests: "Front Seat"
 *                 registrationDate: "2024-04-13T12:28:32.619Z"
 */

/**
 * @swagger
 * /api/events/create:
 *   post:
 *     summary: Create a new event registration
 *     description: Creates a new event registration with the provided details.
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventName:
 *                 type: string
 *               attendeeFirstName:
 *                 type: string
 *               attendeeLastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               contactNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               ticketType:
 *                 type: string
 *                 enum: [Regular, VIP, Student]
 *               registrationDate:
 *                 type: string
 *                 format: date-time
 *               paymentStatus:
 *                 type: string
 *                 enum: [Paid, Pending, Refunded]
 *               registrationStatus:
 *                 type: string
 *                 enum: [Confirmed, Waitlisted, Cancelled]
 *               specialRequests:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Event registration created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 event:
 *                   type: object
 *                   properties:
 *                     eventName:
 *                       type: string
 *                     attendeeFirstName:
 *                       type: string
 *                     attendeeLastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     contactNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     ticketType:
 *                       type: string
 *                       enum: [Regular, VIP, Student]
 *                     registrationDate:
 *                       type: string
 *                       format: date-time
 *                     paymentStatus:
 *                       type: string
 *                       enum: [Paid, Pending, Refunded]
 *                     registrationStatus:
 *                       type: string
 *                       enum: [Confirmed, Waitlisted, Cancelled]
 *                     specialRequests:
 *                       type: string
 *                     _id:
 *                       type: string
 *               example:
 *                 message: Event registration created successfully
 *                 event:
 *                   eventName: Music Festival
 *                   attendeeFirstName: Kelly
 *                   attendeeLastName: Felder
 *                   email: kelly.felder@gmail.com
 *                   contactNumber: "9876543210"
 *                   address: 456 Melody Avenue
 *                   ticketType: VIP
 *                   registrationDate: "2022-07-15T08:00:00.000Z"
 *                   paymentStatus: Pending
 *                   registrationStatus: Waitlisted
 *                   specialRequests: Front row seats
 *                   _id: 662612b187fb3e1f833617c1
 */

/**
 * @swagger
 * /api/events/update/{id}:
 *   put:
 *     summary: Update an event registration by ID
 *     description: Updates an event registration with the provided ID and details.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event registration to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventName:
 *                 type: string
 *               attendeeFirstName:
 *                 type: string
 *               attendeeLastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               contactNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               ticketType:
 *                 type: string
 *                 enum: [Regular, VIP, Student]
 *               registrationDate:
 *                 type: string
 *                 format: date-time
 *               paymentStatus:
 *                 type: string
 *                 enum: [Paid, Pending, Refunded]
 *               registrationStatus:
 *                 type: string
 *                 enum: [Confirmed, Waitlisted, Cancelled]
 *               specialRequests:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Event registration updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 event:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     eventName:
 *                       type: string
 *                     attendeeFirstName:
 *                       type: string
 *                     attendeeLastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     contactNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     ticketType:
 *                       type: string
 *                       enum: [Regular, VIP, Student]
 *                     registrationDate:
 *                       type: string
 *                       format: date-time
 *                     paymentStatus:
 *                       type: string
 *                       enum: [Paid, Pending, Refunded]
 *                     registrationStatus:
 *                       type: string
 *                       enum: [Confirmed, Waitlisted, Cancelled]
 *                     specialRequests:
 *                       type: string
 *               example:
 *                 message: Event registration updated successfully
 *                 event:
 *                   _id: 662612b187fb3e1f833617c1
 *                   eventName: Film Screening
 *                   attendeeFirstName: Maleesha
 *                   attendeeLastName: Shashindi
 *                   email: maleeshas.2000@gmail.com
 *                   contactNumber: "0713970808"
 *                   address: Kandy, Sri Lanka
 *                   ticketType: Student
 *                   registrationDate: "2024-04-13T12:28:32.619Z"
 *                   paymentStatus: Pending
 *                   registrationStatus: Confirmed
 *                   specialRequests: Front Seat
 */

/**
 * @swagger
 * /api/events/delete/{id}:
 *   delete:
 *     summary: Delete an event registration by ID
 *     description: Deletes an event registration with the provided ID.
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event registration to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event registration deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Event registration deleted successfully
 */

// Routes for Event CRUD operations
router.get("/", eventController.getAllEvents);
router.get("/get/:id", eventController.getEventById);
router.post("/create", eventController.createEvent);
router.put("/update/:id", eventController.updateEvent);
router.delete("/delete/:id", eventController.deleteEvent);

module.exports = router;