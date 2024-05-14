import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from '../../Nav/adminNav';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaCheckCircle, FaEdit, FaReceipt, FaTimesCircle, FaTrash } from 'react-icons/fa';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = () => {
        axios
            .get('http://localhost:8175/appointment/')
            .then((res) => {
                setAppointments(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8175/appointment/delete/${id}`)
            .then(() => {
                fetchAppointments();
            })
            .catch((err) => {
                console.log(err);
                alert('Error deleting appointment');
            });
    };

    const handleGenerateReport = () => {
        html2canvas(document.querySelector("#appointment-table")).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgHeight = canvas.height * 208 / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, 208, imgHeight);
          pdf.save("appointment_report.pdf");
        });
      };

    const handleApprove = (id) => {
        axios
            .put(`http://localhost:8175/appointment/approve/${id}`)
            .then(() => {
                setAppointments(prevAppointments => prevAppointments.map(appointment => {
                    if (appointment._id === id) {
                        return { ...appointment, approved: true };
                    }
                    return appointment;
                }));
            })
            .catch((err) => {
                console.log(err);
                alert('Error approving appointment');
            });
    };

    const handleCancelApproval = (id) => {
        axios
            .put(`http://localhost:8175/appointment/cancelApproval/${id}`)
            .then(() => {
                setAppointments(prevAppointments => prevAppointments.map(appointment => {
                    if (appointment._id === id) {
                        return { ...appointment, approved: false };
                    }
                    return appointment;
                }));
            })
            .catch((err) => {
                console.log(err);
                alert('Error cancelling approval');
            });
    };

    const filteredAppointments = appointments.filter((appointment) =>
        appointment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <header>
                <AdminNav />
            </header>
        <main className="plist ml-28">
            <div>
                <div className="flex justify-between items-center mt-12 mb-4">
                    <div className="rounded-lg bg-green-300 shadow-md p-4 mb-4 mr-4 ml-10 mt-12 duration-500 hover:scale-105 hover:shadow-xl w-50">
                        <div className="flex items-center justify-center mb-2">
                            <div className="text-lg font-semibold">Total Appointments</div>
                        </div>
                        <div className="text-center text-3xl font-bold text-gray-800">
                            {filteredAppointments.length}
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleGenerateReport}
                            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded-lg mt-12 mr-20 rounded-lg "
                        >
                            <FaReceipt/>
                            Report
                        </button>
                    </div>
                </div>

                <div className="mt-4 ml-20">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ml-20 "
                    />
                </div>
            
                <table id="appointment-table" className="w-full text-sm text-left text-gray-500 border-collapse mt-8 ml-1 px-20">
                    {/* Table Header */}
                    <thead className="text-xs text-white uppercase bg-gray-900">
                        <tr>
                            <th className="px-2 py-2">Name</th>
                            <th className="px-2 py-2">Email</th>
                            <th className="px-2 py-2">Telephone</th>
                            <th className="px-4 py-2">Phone Type</th>
                            <th className="px-2 py-2">Service Type</th>
                            <th className="px-2 py-2">Date</th>
                            <th className="px-2 py-2">Receipt</th>
                            <th className="px-2 py-2">Description</th>
                            <th className="px-2 py-2">Actions</th>
                            <th className="px-2 py-2">Approve</th>
                            <th className="px-2 py-2">Cancel Approval</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {currentItems.map((appointment, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-white-50">
                                {/* Table Data */}
                                <td className="px-2 py-2">{appointment.name}</td>
                                <td className="px-2 py-2">{appointment.email}</td>
                                <td className="px-2 py-2">{appointment.telephone}</td>
                                <td className="px-4 py-2">{appointment.phoneType}</td>
                                <td className="px-2 py-2">{appointment.serviceType}</td>
                                <td className="px-2 py-2">{appointment.date}</td>
                                <td className="px-2 py-2">
                                    <img
                                        src={appointment.image}
                                        alt={appointment.name}
                                        className="w-20 h-20 object-cover"
                                    />
                                </td>
                                <td className="px-2 py-2">{appointment.description}</td>
                                <td className="px-2 py-2">
                                    <Link to={`/updateAppointment/${appointment._id}`}>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                                            <FaEdit/>
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDelete(appointment._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                        <FaTrash/>
                                    </button>
                                </td>
                                <td className="px-2 py-2">
                                    {appointment.approved ? (
                                        <span className="text-green-500 font-bold">Approved</span>
                                    ) : (
                                        <button onClick={() => handleApprove(appointment._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                                            <FaCheckCircle/> Approve
                                        </button>
                                    )}
                                </td>
                                <td className="px-2 py-2">
                                    {appointment.approved && (
                                        <button onClick={() => handleCancelApproval(appointment._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                            <FaTimesCircle/> Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <ul className="flex">
                        {Array.from({
                            length: Math.ceil(filteredAppointments.length / itemsPerPage),
                        }).map((_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => paginate(index + 1)}
                                    className={`${
                                        currentPage === index + 1
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-300 text-gray-700'
                                    } font-semibold py-2 px-4 rounded-l`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            </main>
        </div>
    );
}

export default AppointmentList;
