import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserNav from '../../Nav/userNav';
import Cookies from 'js-cookie';

function UserAppointmentList() {
    const [userAppointments, setUserAppointments] = useState([]);
    const userId = Cookies.get('userId');

    useEffect(() => {
        fetchUserAppointments();
    }, []);

    const fetchUserAppointments = () => {
        axios
            .get(`http://localhost:8175/appointment/`)
            .then((res) => {
                const appointments = res.data;
                const filteredAppointments = appointments.filter(appointment => appointment.userId === userId);
                setUserAppointments(filteredAppointments);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8175/appointment/delete/${id}`)
            .then(() => {
                // Refresh appointment list after deletion
                fetchUserAppointments();
            })
            .catch((err) => {
                console.log(err);
                alert('Error deleting appointment');
            });
    };

    return (
        <div className="mx-auto max-w-7xl p-5 rounded-lg mt-6">
            <header>
                <UserNav />
            </header>

            <div>
                <table className="w-full bg-gray-100 shadow-md rounded-lg overflow-hidden">
                    <thead className="text-white bg-gray-800">
                        <tr>
                            <th className="py-4 px-6">Name</th>
                            <th className="py-4 px-6">Email</th>
                            <th className="py-4 px-6">Telephone</th>
                            <th className="py-4 px-6">Phone Type</th>
                            <th className="py-4 px-6">Service Type</th>
                            <th className="py-4 px-6">Date</th>
                            <th className="py-4 px-6">Receipt</th>
                            <th className="py-4 px-6">Description</th>
                            <th className="py-4 px-6">Approval Status</th>
                            <th className="py-4 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {userAppointments.map((appointment, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}>
                                <td className="py-4 px-6">{appointment.name}</td>
                                <td className="py-4 px-6">{appointment.email}</td>
                                <td className="py-4 px-6">{appointment.telephone}</td>
                                <td className="py-4 px-6">{appointment.phoneType}</td>
                                <td className="py-4 px-6">{appointment.serviceType}</td>
                                <td className="py-4 px-6">{appointment.date}</td>
                                <td className="py-4 px-6">
                                    <img src={appointment.image} alt={appointment.name} style={{ width: '60px', height: '50px' }} />
                                </td>
                                <td className="py-4 px-6">{appointment.description}</td>
                                <td className="py-4 px-6">
                                    <span
                                        className={`px-2 py-1 rounded-lg text-white ${
                                            appointment.approved ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                    >
                                        {appointment.approved ? 'Approved' : 'Not Approved'}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <Link to={`/updateAppointment/${appointment._id}`} className="mr-2">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Update
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDelete(appointment._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserAppointmentList;
