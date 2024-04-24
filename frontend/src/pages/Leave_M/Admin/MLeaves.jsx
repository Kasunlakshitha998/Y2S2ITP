import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../Components/Leave_Management/Admin/Sidebar';
import "./Myleaves.scss"

export const MLeaves = () => {

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [LeaveRequestToUpdate,setLeaveRequestToUpdate]= useState(null); 
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
      const response = await axios.get('http://localhost:8175/Leave/');
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

  const submitLeaveRequest = (e) => {
    e.preventDefault();
    if (isUpdateMode && LeaveRequestToUpdate) {
      axios.put(`http://localhost:8175/Leave/update/${LeaveRequestToUpdate._id}`, newLeaveRequest)
        .then(result => {
          console.log(result);
          setIsUpdateMode(false);
          setLeaveRequestToUpdate(null);
          setNewLeaveRequest({
            EmpID: '',
            name: '',
            Email: '',
            Contact: '',
            Destination: '',
            LDateF: '',
            LdateT: '',
            LType: '',
            Lduration: '',
            attachments: '',
            remarks: '',
            Sup_name: '',
            Sup_des: '',
            Backup: ''
          });
          fetchLeaveRequests();
        })
        .catch(err => console.log(err));
    } else {
      axios.post("http://localhost:8175/Leave/create", newLeaveRequest)
        .then(result => {
          console.log(result);
          setNewLeaveRequest({
            EmpID: '',
            name: '',
            Email: '',
            Contact: '',
            Destination: '',
            LDateF: '',
            LdateT: '',
            LType: '',
            Lduration: '',
            attachments: '',
            remarks: '',
            Sup_name: '',
            Sup_des: '',
            Backup: ''
          });
          fetchLeaveRequests();
        })
        .catch(err => console.log(err));
    }
  };

  const handleEditLeaveRequest = (leaveRequest) => {
    setLeaveRequestToUpdate(leaveRequest);
    setNewLeaveRequest({
      EmpID: leaveRequest.EmpID,
      name: leaveRequest.name,
      Email: leaveRequest.Email,
      Contact: leaveRequest.Contact,
      Destination: leaveRequest.Destination,
      LDateF: leaveRequest.LDateF,
      LdateT: leaveRequest.LdateT,
      LType: leaveRequest.LType,
      Lduration: leaveRequest.Lduration,
      attachments: leaveRequest.attachments,
      remarks: leaveRequest.remarks,
      Sup_name: leaveRequest.Sup_name,
      Sup_des: leaveRequest.Sup_des,
      Backup: leaveRequest.Backup
    });
    setIsUpdateMode(true);
  };
  
  
  

  const handleDeleteLeaveRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:8175/Leave/delete/${id}`, newLeaveRequest);
      console.log('Leave request deleted successfully');
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error deleting leave request:', error);
    }
  };

  const clearForm = () => {
    setNewLeaveRequest({
      EmpID: '',
      name: '',
      Email: '',
      Contact: '',
      Destination: '',
      LDateF: '',
      LdateT: '',
      LType: '',
      Lduration: '',
      attachments: '',
      remarks: '',
      Sup_name: '',
      Sup_des: '',
      Backup: ''
    });
  };

  return (
    <div>
        <Sidebar/>
        <h2>Manage  Employee's Leaves </h2>
        <h3>Manage company employee's leaves here</h3>
        <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th> Contact Number </th>
                  <th>Designation</th>
                  <th>Leave Date from</th>
                  <th>Leave Date To</th>
                  <th>Leave Type</th>
                  <th>Leave Duration</th>
                  <th>Attachments</th>
                  <th>Remarks</th>
                  <th>Supervisor Name</th>
                  <th>Supervisor Designation</th>
                  <th>Backup Person</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((leaveRequest) => (
                  <tr key={leaveRequest._id}>
            <td>{leaveRequest.EmpID}</td>
  <td>{leaveRequest.name}</td>
<td>{leaveRequest.Email}</td>
<td>{leaveRequest.Contact}</td>
<td>{leaveRequest.Destination}</td>
<td>{leaveRequest.LDateF}</td>
<td>{leaveRequest.LdateT}</td>
<td>{leaveRequest.LType}</td>
<td>{leaveRequest.Lduration}</td>
<td>{leaveRequest.attachments}</td> {/* Special handling may be required */}
<td>{leaveRequest.remarks}</td>
<td>{leaveRequest.Sup_name}</td>
<td>{leaveRequest.Sup_des}</td>
<td>{leaveRequest.Backup}</td>

                    <td>
                      <button onClick={() => handleEditLeaveRequest (leaveRequest)}>Approve</button>
                      <button onClick={() => handleDeleteLeaveRequest(leaveRequest._id)}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  );
};

 export default MLeaves;