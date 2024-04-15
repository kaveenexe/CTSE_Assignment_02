import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AllRegisteredUsers() {
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/events")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users: ", error));
  }, []);

  const deleteUser = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/events/delete/${eventId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "There was an error deleting the record."
        );
      }
      setUsers(users.filter((event) => event._id !== eventId));
      alert("Are you sure you want to delete record?");
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  return (
    <div className="main-component-2">
      <Header
        title="All Registered Users"
        subtitle="View and manage all registered users."
      />
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          className="success-alert"
          dismissible
        >
          Deleted Successfully!
        </Alert>
      )}
      <div className="table-container">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Event Name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Ticket Type</th>
              <th>Registration Date</th>
              <th>Registration Status</th>
              <th>Special Requests</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((event) => (
              <tr key={event._id}>
                <td>{event.eventName}</td>
                <td>{`${event.attendeeFirstName} ${event.attendeeLastName}`}</td>
                <td>{event.email}</td>
                <td>{event.contactNumber}</td>
                <td>{event.address}</td>
                <td>{event.ticketType}</td>
                <td>{new Date(event.registrationDate).toLocaleDateString()}</td>
                <td>{event.registrationStatus}</td>
                <td>{event.specialRequests}</td>
                <td>
                  <Link to={`/update-event/${event._id}`}>
                    <button className="edit-btn mr-2">Edit</button>
                  </Link>
                  <button
                    onClick={() => deleteUser(event._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn-grp">
        <Link to="/add-event">
          <Button variant="danger">Register User</Button>
        </Link>
      </div>
    </div>
  );
}

export default AllRegisteredUsers;
