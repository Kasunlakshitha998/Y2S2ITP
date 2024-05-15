import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./displayuser.css"; // Import your CSS file
import Swal from 'sweetalert2';
import { BsPersonFill } from 'react-icons/bs'; 
import AdminNav from '../Nav/adminNav';

function Staff() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8175/user/staffdetails')
            .then(result => {
                console.log(result.data);
                setUsers(result.data.users || []);
            })
            .catch(err => console.log(err));
    }, []);
    
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleDelete = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Should you delete this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8175/user/deleteUser/${userId}`)
                    .then(() => {
                        setUsers(users.filter((user) => user._id !== userId));
                        Swal.fire({
                            title: "Deleted!",
                            text: "User deleted successfully.",
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        console.error('Error deleting user:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete user. Please try again later.",
                            icon: "error"
                        });
                    });
            }
        });
    };
    const handleReport = () => {
        // Generate report data
        const reportData = filteredUsers.map(user => ({
            Name: user.name,
            Email: user.email,
            Number: user.number
        }));

        // Convert data to CSV format
        const csvData = [
            Object.keys(reportData[0]).join(','),
            ...reportData.map(item => Object.values(item).join(','))
        ].join('\n');

        // Create a Blob from the CSV data
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Create a link element and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'user_report.csv');
        document.body.appendChild(link);
        link.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };
    
    return (
        <div className="container-fluid">
            <AdminNav />
            <div className="button-container">
                    <Link to="/createstaff" className='bg-green-500 hover:bg-green-700 text-white inline-flex items-center border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2.5'>Add +</Link>
                    
                </div>
            <div className="card-body">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="form-control"
                    />
                </div>
        
                <div className="button-container">
                    <Link to="/createstaff" className='bg-green-500 hover:bg-green-700 text-white inline-flex items-center border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2.5'>Add +</Link>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white inline-flex items-center border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2.5"
                        onClick={handleReport}
                    >
                        Get Report
                    </button>
                </div>

                <p className='btn total-users'>Total Users: {users.length}</p>

                <div style={{ overflowX: 'auto' }}>
                    <table className="table mt-3">
                        <thead className="thead-dark table-header">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Number</th>
                                <th>Image</th>
                                <th>role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => {
                                return (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className="password-cell">{user.password}</td>
                                        <td>{user.number}</td>
                                        <td>
                                            {user.image ? (
                                                <img src={`http://localhost:3000/image/${user.image}`} alt="User" style={{ width: '100px', height: '90px' }} />
                                            ) : (
                                                <BsPersonFill size={60} color="#adb5bd" />
                                            )}
                                        </td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Link to={`/staffupdate/${user._id}`} className='btn btn-success'>
                                                <i className="bi bi-pencil-fill"></i> Update
                                            </Link>
                                            <button className='btn btn-danger ml-2' onClick={(e)=>handleDelete(user._id)}>
                                                <i className="bi bi-trash-fill"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Staff;
