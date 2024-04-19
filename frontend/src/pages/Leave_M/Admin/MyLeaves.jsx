// MyLeaves.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../Components/Leave_Management/Admin/Sidebar';
import "./Myleaves.scss";


const MyLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    
    EmpID: '',
    name: '',
    Email: '',
    Contact: '',
    Destination: '',
    LDateF: '',
    LdateT: '',
    LType: '',
    Lduration: '',
    attachments: '', // This field may need special handling
    remarks: '',
    Sup_name: '',
    Sup_des: '',
    Backup: ''
  });

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('/api/Leave');
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeaveRequest({ ...newLeaveRequest, [name]: value });
  };

  const handleCreateLeaveRequest = async () => {
    try {
      await axios.post('http://localhost:8175/Leave/create', newLeaveRequest);
      console.log('Leave request created successfully');
    } catch (error) {
      console.error('Error creating leave request:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        
      }
    }
  };
  
  

  const handleDeleteLeaveRequest = async (id) => {
    try {
      await axios.delete(`/api/Leave/delete/${id}`);
      console.log('Leave request deleted successfully');
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error deleting leave request:', error);
    }
  };

  return (
    <div>
        <Sidebar/>
      <h1>Leave Requests</h1>
      <div>
        {/* Form to create a new leave request */}
        <h2 >Create New Leave Request</h2>
        <div className=' L_inputs'>
        {/* <input type="text" name="requestID" value={newLeaveRequest.requestID} onChange={handleInputChange} placeholder="Request ID" /> */}
        <input type="text" name="EmpID" value={newLeaveRequest.EmpID} onChange={handleInputChange} placeholder="Employee ID" />
        <input type="text" name="name" value={newLeaveRequest.name} onChange={handleInputChange} placeholder="Your name" />
        <input type="text" name="Email" value={newLeaveRequest.Email} onChange={handleInputChange} placeholder="Email" />
        <input type="text" name="Contact" value={newLeaveRequest.Contact} onChange={handleInputChange} placeholder="Contact Number" />
        <input type="text" name="Destination" value={newLeaveRequest.Destination} onChange={handleInputChange} placeholder="Destination" />
        <input type="date" name="LDateF" value={newLeaveRequest.LDateF} onChange={handleInputChange}  />
        <input type="date" name="LdateT" value={newLeaveRequest.LdateT} onChange={handleInputChange}/>
        <input type="text" name="Lduration" value={newLeaveRequest.Lduration} onChange={handleInputChange} placeholder="Leave Duration" />
        <input type="text" name="attachments" value={newLeaveRequest.attachments} onChange={handleInputChange} placeholder="Attachments" />
        <input type="text" name="remarks" value={newLeaveRequest.remarks} onChange={handleInputChange} placeholder="Remarks" />
        <input type="text" name="Sup_name" value={newLeaveRequest.Sup_name} onChange={handleInputChange} placeholder="Supervisor Name" />
        <input type="text" name="Sup_des" value={newLeaveRequest.Sup_des} onChange={handleInputChange} placeholder="Supervisor Designation" />
        <input type="text" name="Backup" value={newLeaveRequest.Backup} onChange={handleInputChange} placeholder="Backup person" />
        </div>
        {/* Add other input fields similarly */}
        <button onClick={handleCreateLeaveRequest}>Create Leave Request</button>
      </div>
      <div>
        {/* List of leave requests */}
        <h2>Leave Requests List</h2>
        <ul>
          {leaveRequests.map((leaveRequest) => (
            <li key={leaveRequest._id}>
              {leaveRequest.name} - {leaveRequest.Destination}
              <button onClick={() => handleDeleteLeaveRequest(leaveRequest._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyLeaves;
