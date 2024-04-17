const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const Event = require("../models/eventModel");

// Mock Express Request and Response objects
const mockRequest = (body = {}, params = {}) => {
  return { body, params };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Mock Event data
const mockEvent = {
  _id: "661f7c82d9b1525312aab3c0",
  eventName: "Colombo Fashion Week",
  attendeeFirstName: "John",
  attendeeLastName: "Doe",
  email: "john.doe@gmail.com",
  contactNumber: "0712345678",
  address: "123 Main Street, Colombo",
  ticketType: "Regular",
  registrationDate: new Date("2024-04-17T07:38:42.339Z"),
  paymentStatus: "Pending",
  registrationStatus: "Confirmed",
  specialRequests: "No special requests",
};

// Mock Error
const mockError = new Error("Test Error");

// Mock Event object methods
Event.save = jest.fn();
Event.findById = jest.fn();
Event.find = jest.fn();
Event.findByIdAndUpdate = jest.fn();
Event.findByIdAndDelete = jest.fn();

describe("Event Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createEvent", () => {
    test("should return 201 status code with event object on successful creation", async () => {
      const req = mockRequest({ ...mockEvent });
      const res = mockResponse();

      // Mock the save method of the Event model
      Event.prototype.save = jest.fn().mockResolvedValueOnce(mockEvent);

      await createEvent(req, res);

      // Assertions
      expect(Event.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Event registration created successfully",
        event: expect.objectContaining({
          eventName: mockEvent.eventName,
          attendeeFirstName: mockEvent.attendeeFirstName,
          attendeeLastName: mockEvent.attendeeLastName,
          email: mockEvent.email,
          contactNumber: mockEvent.contactNumber,
          address: mockEvent.address,
          ticketType: mockEvent.ticketType,
          registrationDate: expect.any(Date),
          paymentStatus: mockEvent.paymentStatus,
          registrationStatus: mockEvent.registrationStatus,
          specialRequests: mockEvent.specialRequests,
        }),
      });
    });

    test("should return 400 status code with error message when required fields are missing", async () => {
      const req = mockRequest({});
      const res = mockResponse();
      await createEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Missing required fields",
      });
    });

    test("should return 400 status code with error message when email format is invalid", async () => {
      const req = mockRequest({ ...mockEvent, email: "invalidEmail" });
      const res = mockResponse();
      await createEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid email address",
      });
    });

    test("should return 400 status code with error message when contact number format is invalid", async () => {
      const req = mockRequest({ ...mockEvent, contactNumber: "invalidNumber" });
      const res = mockResponse();
      await createEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid contact number",
      });
    });

    test("should return 500 status code with error message on internal server error", async () => {
      const req = mockRequest({ ...mockEvent });
      const res = mockResponse();
      // Mock the save method of the Event model to throw an error
      Event.prototype.save = jest.fn().mockRejectedValueOnce(mockError);
      await createEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("getAllEvents", () => {
    test("should return array of events with success message and 200 status code", async () => {
      const req = mockRequest();
      const res = mockResponse();
      Event.find.mockResolvedValueOnce([mockEvent]);
      await getAllEvents(req, res);
      expect(res.json).toHaveBeenCalledWith([mockEvent]);
    });

    test("should return 500 status code with error message on internal server error", async () => {
      const req = mockRequest();
      const res = mockResponse();
      Event.find.mockRejectedValueOnce(mockError);
      await getAllEvents(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("getEventById", () => {
    test("should return event object with success message and 200 status code", async () => {
      const req = mockRequest({}, { id: "eventId" });
      const res = mockResponse();
      Event.findById.mockResolvedValueOnce(mockEvent);
      await getEventById(req, res);
      expect(res.json).toHaveBeenCalledWith(mockEvent);
    });

    test("should return 404 status code with error message when event is not found", async () => {
      const req = mockRequest({}, { id: "nonExistingId" });
      const res = mockResponse();
      Event.findById.mockResolvedValueOnce(null);
      await getEventById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Event not found" });
    });

    test("should return 500 status code with error message on internal server error", async () => {
      const req = mockRequest({}, { id: "eventId" });
      const res = mockResponse();
      Event.findById.mockRejectedValueOnce(mockError);
      await getEventById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("updateEvent", () => {
    test("should return 400 status code with error message when contact number format is invalid", async () => {
      const req = mockRequest(
        { ...mockEvent, contactNumber: "invalidNumber" },
        { id: "eventId" }
      );
      const res = mockResponse();
      await updateEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid contact number",
      });
    });

    test("should return 400 status code with error message when email format is invalid", async () => {
      const req = mockRequest(
        { ...mockEvent, email: "invalidEmail" },
        { id: "eventId" }
      );
      const res = mockResponse();
      await updateEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid email address" });
    });

    test("should return 404 status code with error message when event is not found", async () => {
      const req = mockRequest({ ...mockEvent }, { id: "nonExistingId" });
      const res = mockResponse();
      Event.findById.mockResolvedValueOnce(null);
      await updateEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Event not found" });
    });

    test("should return 500 status code with error message on internal server error", async () => {
      const req = mockRequest({ ...mockEvent }, { id: "eventId" });
      const res = mockResponse();
      Event.findById.mockResolvedValueOnce(mockEvent);
      Event.findByIdAndUpdate.mockRejectedValueOnce(mockError);
      await updateEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    } );
  });

  describe("deleteEvent", () => {
    test("should return 404 status code with error message when event is not found", async () => {
      const req = mockRequest({}, { id: "nonExistingId" });
      const res = mockResponse();
      Event.findByIdAndDelete.mockResolvedValueOnce(null);
      await deleteEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Event not found" });
    });

    test("should return 500 status code with error message on internal server error", async () => {
      const req = mockRequest({}, { id: "eventId" });
      const res = mockResponse();
      Event.findByIdAndDelete.mockRejectedValueOnce(mockError);
      await deleteEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    } );
    
    test("should return 200 status code with success message when event is successfully deleted", async () => {
      const req = mockRequest({}, { id: "existingEventId" });
      const res = mockResponse();
      Event.findByIdAndDelete.mockResolvedValueOnce({ _id: "existingEventId" });
      await deleteEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Event registration deleted successfully",
      });
    });
  });
});
