import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import UserNav from '../../Nav/userNav';
import Cookies from 'js-cookie';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this appointment!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:8175/appointment/delete/${id}`)
                    .then(() => {
                        // Refresh appointment list after deletion
                        fetchUserAppointments();
                        Swal.fire(
                            'Deleted!',
                            'Your appointment has been deleted.',
                            'success'
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire(
                            'Error!',
                            'Failed to delete appointment.',
                            'error'
                        );
                    });
            }
        });
    };
    return (
        <div>
            <header>
                <UserNav />
            </header>

            <div>
                <table className="w-full border-collapse mt-20 ml-0 px-10 round-lg">
                    <thead className="text-xs text-white bg-gray-900">
                        <tr>
                            <th className="px-2 py-2">Name</th>
                            <th className="px-2 py-2">Email</th>
                            <th className="px-4 py-2">Telephone</th>
                            <th className="px-4 py-2">Phone Type</th>
                            <th className="px-2 py-2">Service Type</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Receipt</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Status</th> {/* New Column for Status */}
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-500">
                        {userAppointments.map((appointment, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-300' : 'bg-grey-300'}>
                                <td className="px-2 py-2">{appointment.name}</td>
                                <td className="px-2 py-2">{appointment.email}</td>
                                <td className="px-4 py-2">{appointment.telephone}</td>
                                <td className="px-4 py-2">{appointment.phoneType}</td>
                                <td className="px-2 py-2">{appointment.serviceType}</td>
                                <td className="px-4 py-2">{appointment.date}</td>
                                <td className="px-4 py-2">
                                    <img src={appointment.image} alt={appointment.name} className="w-20 h-20 object-cover" />
                                </td>
                                <td className="px-4 py-2">{appointment.description}</td>
                                <td className="px-4 py-2">{appointment.approved ? 'Approved' : 'Not Approved'}</td> {/* Displaying Status */}
                                <td className="px-4 py-2">
                                    <Link to={`/updateAppointment/${appointment._id}`}>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"><FaEdit/></button>
                                    </Link>
                                    <button onClick={() => handleDelete(appointment._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"><FaTrash/></button>
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
