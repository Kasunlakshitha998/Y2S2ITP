// MyLeaves.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../Components/Leave_Management/Admin/Sidebar';
import "./Myleaves.scss";


const MyLeaves = () => {
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
     
        <form action="" className='leave-form' onSubmit={submitLeaveRequest}>
        <h1>Leave Requests</h1>
        <h2 >Create New Leave Request</h2>
        <div className=' L_inputs'>
          <div className="form-left" >
          <div className="form-row">
          <label htmlFor="">Employee ID</label>
        <input type="text" name="EmpID" value={newLeaveRequest.EmpID} onChange={handleInputChange} placeholder="Employee ID" />
          </div>
          <div className="form-row">
        <label htmlFor="">Your Name</label>
        <input type="text" name="name" value={newLeaveRequest.name} onChange={handleInputChange} placeholder="Your name" />
        </div>
        <div className="form-row">
        <label htmlFor="">Email</label>
        <input type="text" name="Email" value={newLeaveRequest.Email} onChange={handleInputChange} placeholder="Email" />
</div>
<div className="form-row">
    <label htmlFor="">Contact Number</label>
        <input type="text" name="Contact" value={newLeaveRequest.Contact} onChange={handleInputChange} placeholder="Contact Number" />
        </div>

        <div className="form-row">
        <label htmlFor="">Designation</label>
        <input type="text" name="Destination" value={newLeaveRequest.Destination} onChange={handleInputChange} placeholder="Designation" />
        </div>

        <div className="form-row">
        <label htmlFor="">Leave Date from</label>
        <input type="date" name="LDateF" value={newLeaveRequest.LDateF} onChange={handleInputChange}  />
        </div>
        
        <div className="form-row">
        <label htmlFor="">Leave Date To</label>
        <input type="date" name="LdateT" value={newLeaveRequest.LdateT} onChange={handleInputChange}/>
        </div>
        </div>

        <div className="form-right">

        <div className="form-row">
        <label htmlFor="">Leave Type</label>
        <input type="text" name="LType" value={newLeaveRequest.LType} onChange={handleInputChange} placeholder="Leave Type" />
        </div>

        <div className="form-row">
        <label htmlFor="">Leave Duration</label>
        <input type="text" name="Lduration" value={newLeaveRequest.Lduration} onChange={handleInputChange} placeholder="Leave Duration" />
        </div>

        <div className="form-row">
        <label htmlFor="">Attachments</label>
        <input type="file" name="attachments" value={newLeaveRequest.attachments} onChange={handleInputChange} placeholder="Attachments" />
        </div>

        <div className="form-row">
        <label htmlFor="">Remarks</label>
        <input type="text" name="remarks" value={newLeaveRequest.remarks} onChange={handleInputChange} placeholder="Remarks" />
        </div>

        <div className="form-row">
        <label htmlFor="">Supervisor Name</label>
        <input type="text" name="Sup_name" value={newLeaveRequest.Sup_name} onChange={handleInputChange} placeholder="Supervisor Name" />
      </div>

      <div className="form-row">
        <label htmlFor="">Supervisor Designation</label>
        <input type="text" name="Sup_des" value={newLeaveRequest.Sup_des} onChange={handleInputChange} placeholder="Supervisor Designation" />
        </div>

        <div className="form-row">
        <label htmlFor="">Backup Person</label>
        <input type="text" name="Backup" value={newLeaveRequest.Backup} onChange={handleInputChange} placeholder="Backup person" />
        </div>
        </div>
        </div>
        {/* Add other input fields similarly */}
        <button type="submit">{isUpdateMode ? 'Update' : 'Add'}</button>
        <button  onClick={clearForm}>Cancel</button>
        </form>
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
                      <button onClick={() => handleEditLeaveRequest (leaveRequest)}>Edit</button>
                      <button onClick={() => handleDeleteLeaveRequest(leaveRequest._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  );
};

export default MyLeaves;
