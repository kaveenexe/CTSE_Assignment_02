const mongoose = require( "mongoose" );

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  attendeeFirstName: {
    type: String,
    required: true,
  },
  attendeeLastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  ticketType: {
    type: String,
    enum: ["Regular", "VIP", "Student"],
    default: "Regular",
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending", "Refunded"],
    default: "Pending",
  },
  registrationStatus: {
    type: String,
    enum: ["Confirmed", "Waitlisted", "Cancelled"],
    default: "Confirmed",
  },
  specialRequests: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
