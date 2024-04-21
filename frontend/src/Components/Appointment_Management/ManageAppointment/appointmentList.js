import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from '../../Nav/adminNav'; // Corrected import statement

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8175/appointment/')
            .then((res) => {
                setAppointments(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    return (
      <div className="mx-auto max-w-7xl p-5  rounded-lg  mt-6">
        <header>
          <AdminNav />
        </header>

        <div >
          <table className="w-full bg-gray-100 shadow-md rounded-lg overflow-hidden">
            <thead className="text-white bg-gray-800">
              <tr>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Telephone</th>
                <th className="py-4 px-6">Phone Type</th>
                <th className="py-4 px-6">Service Type</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Reciept</th>
                <th className="py-4 px-6">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {appointments.map((appointment, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}
                >
                  <td className="py-4 px-6">{appointment.name}</td>
                  <td className="py-4 px-6">{appointment.email}</td>
                  <td className="py-4 px-6">{appointment.telephone}</td>
                  <td className="py-4 px-6">{appointment.phoneType}</td>
                  <td className="py-4 px-6">{appointment.serviceType}</td>
                  <td className="py-4 px-6">{appointment.date}</td>
                  <td className="py-4 px-6">
                    <img
                      src={appointment.image}
                      alt={appointment.name}
                      style={{ width: '90px', height: '80px' }}
                    />
                  </td>
                  <td className="py-4 px-6">{appointment.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default AppointmentList;
