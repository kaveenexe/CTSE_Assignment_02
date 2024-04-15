import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../components/Header";
import "./Styles.css";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

const AddEventRegister = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formInputs, setFormInputs] = useState({
    eventName: "",
    attendeeFirstName: "",
    attendeeLastName: "",
    email: "",
    contactNumber: "",
    address: "",
    ticketType: "Regular",
    specialRequests: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorText =
          responseData.error ||
          "An error occurred while registering for the event.";
        throw new Error(errorText);
      }

      setFormInputs({
        eventName: "",
        attendeeFirstName: "",
        attendeeLastName: "",
        email: "",
        contactNumber: "",
        address: "",
        ticketType: "Regular",
        specialRequests: "",
      });
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
      setShowSuccessAlert(false);
    }
  };

  return (
    <div className="main-component">
      <Header
        title="Event Registration"
        subtitle="Register for the event by filling out the form below."
      />
      {showSuccessAlert && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessAlert(false)}
          dismissible
          className="success-alert"
        >
          Registration Successful!
        </Alert>
      )}
      {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage("")}
          dismissible
          className="error-alert"
        >
          {errorMessage}
        </Alert>
      )}
      <br />
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form>
                <Form.Group className="mb-4" controlId="attendeeFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="attendeeFirstName"
                    value={formInputs.attendeeFirstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    required
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col md={6}>
              <Form>
                <Form.Group className="mb-4" controlId="attendeeLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="attendeeLastName"
                    value={formInputs.attendeeLastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    required
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form>
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formInputs.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col md={6}>
              <Form>
                <Form.Group className="mb-4" controlId="contactNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactNumber"
                    value={formInputs.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your contact number"
                    required
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              value={formInputs.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
            />
          </Form.Group>
          <br />

          <Row>
            <Col md={6}>
              <Form>
                <Form.Group controlId="eventName">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    as="select"
                    name="eventName"
                    value={formInputs.eventName}
                    onChange={handleInputChange}
                  >
                    <option value="Fashion Show Gala">Fashion Show Gala</option>
                    <option value="Tech Conference">Tech Conference</option>
                    <option value="Music Festival">Music Festival</option>
                    <option value="Art Exhibition">Art Exhibition</option>
                    <option value="Food Expo">Food Expo</option>
                    <option value="Sports Tournament">Sports Tournament</option>
                    <option value="Academic Symposium">
                      Academic Symposium
                    </option>
                    <option value="Charity Fundraiser">
                      Charity Fundraiser
                    </option>
                    <option value="Film Screening">Film Screening</option>
                    <option value="Comedy Night">Comedy Night</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col md={6}>
              <Form>
                <Form.Group controlId="ticketType">
                  <Form.Label>Ticket Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="ticketType"
                    value={formInputs.ticketType}
                    onChange={handleInputChange}
                  >
                    <option value="Regular">Regular</option>
                    <option value="VIP">VIP</option>
                    <option value="Student">Student</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <br />

          <Form.Group controlId="specialRequests">
            <Form.Label>Special Requests</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="specialRequests"
              value={formInputs.specialRequests}
              onChange={handleInputChange}
              placeholder="Enter any special requests"
            />
          </Form.Group>

          <br />
          <div className="btn-grp">
            <Button variant="dark" type="submit">
              Register
            </Button>
            <Link to="/all-users">
              <Button variant="dark">View All Users</Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddEventRegister;
