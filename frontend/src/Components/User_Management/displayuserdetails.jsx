import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; // Import axios

function Users() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8175/userdetails')
            .then(result => {
                console.log(result.data); // Log the response data to see its structure
                setUsers(result.data.users || []); // Set users state properly
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filtering users based on the search query
    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleDelete = (userId) => {
        // Make a DELETE request to your API to delete the user with the specified userId
        axios
          .delete(`http://localhost:8175/user/deleteUser/${userId}`)
          .then((response) => {
            console.log(response);
            // Remove the deleted user from the state
            setUsers(users.filter((user) => user._id !== userId));
            // Provide user feedback, for example:
            alert('User deleted successfully.');
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
            // Provide error feedback if necessary
            alert('Failed to delete user. Please try again later.');
          });
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-8">
                    <div className="card mt-3">
                        <div className="card-body">
                            <Link to="/usercreate" className='btn btn-success'>Add +</Link>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={handleSearch}
                                className="form-control mt-3"
                            />
                            <p className='btn btn-success'>Total Users: {users.length}</p>
                           
                            <table className="table mt-3">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Number</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => {
                                        return (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.password}</td>
                                                <td>{user.number}</td>
                                                <td>
                                                    <Link to={`/userupdate/${user._id}`} className='btn btn-success'>Update</Link>
                                                    <button className='btn btn-danger' onClick={(e)=>handleDelete(user._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;
