import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function UpdateDeleteAppointment() {
  const [appointments, setAppointments] = useState([]);

  // Function to fetch all appointments
  const getAppointments = () => {
    axios.get("http://localhost:8175/appointment")
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error("Error fetching appointments:", error);
      });
  };

  // useEffect to fetch appointments when component mounts
  useEffect(() => {
    getAppointments();

    
  }, []);

  // Function to handle appointment deletion
  const deleteAppointment = (id) => {
    axios.delete(`http://localhost:8175/appointment/delete/${id}`)
      .then(() => {
        // Remove the deleted appointment from the state
        setAppointments(appointments.filter(appointment => appointment._id !== id));
        alert("Appointment deleted successfully");
      })
      .catch(error => {
        console.error("Error deleting appointment:", error);
      });
  };

  // Function to handle appointment update (not implemented in this example)

  return (
    <>
      <adminNav />
      <div className="container">
        <h2>Appointments</h2>
        <ul>
          {appointments.map(appointment => (
            <li key={appointment._id}>
              <div>
                <strong>Name:</strong> {appointment.name}<br />
                <strong>Email:</strong> {appointment.email}<br />
                <strong>Telephone:</strong> {appointment.telephone}<br />
                <strong>Phone Type:</strong> {appointment.phoneType}<br />
                <strong>Service Type:</strong> {appointment.serviceType}<br />
                <strong>Date:</strong> {appointment.date}<br />
                <strong>Description:</strong> {appointment.description}<br />
                <button onClick={() => deleteAppointment(appointment._id)}>Delete</button>
                {/* Implement update functionality as needed */}
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
      
    </>
  );
}