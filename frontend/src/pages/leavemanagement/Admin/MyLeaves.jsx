import React, { useState,useEffect} from 'react';
import axios from 'axios';
import AdminNav from './../../../Components/Nav/adminNav';


const MyLeaves = () => {
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [LeaveRequests, setLeaveRequests] = useState([]);
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
      attachments: null, // Initialize attachments as null
      remarks: '',
      Sup_name: '',
      Sup_des: '',
      Backup: ''
    });
    const [LeaveRequestToUpdate, setLeaveRequestToUpdate] = useState(null);
  
    useEffect(() => {
      fetchLeaveRequests();
    }, []);
  
    const fetchLeaveRequests = () => {
      axios.get("http://localhost:8175/Leave/")
        .then(result => setLeaveRequests(result.data))
        .catch(err => console.log(err));
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewLeaveRequest({ ...newLeaveRequest, [name]: value });
    };
  
    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      setNewLeaveRequest({ ...newLeaveRequest, attachments: file });
    };
  
    const submitLeaveRequest = (e) => {
      e.preventDefault();
      // Handle file upload separately if attachments exist
      const formData = new FormData();
      for (const key in newLeaveRequest) {
        formData.append(key, newLeaveRequest[key]);
      }
      if (isUpdateMode && LeaveRequestToUpdate) {
        formData.append('_id', LeaveRequestToUpdate._id); // Append id for update
        axios.put(`http://localhost:8175/Leave/update/${LeaveRequestToUpdate._id}`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
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
      attachments: null,
      remarks: '',
      Sup_name: '',
      Sup_des: '',
      Backup: ''
    });
    fetchLeaveRequests();
  })
  .catch(err => console.log(err));

      } else {
        axios.post("http://localhost:8175/Leave/create", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
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
              attachments: null,
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
        attachments: null, // Don't set the attachment initially
        remarks: leaveRequest.remarks,
        Sup_name: leaveRequest.Sup_name,
        Sup_des: leaveRequest.Sup_des,
        Backup: leaveRequest.Backup
      });
      setIsUpdateMode(true);
    };
  
    const handleDeleteLeaveRequest = (id) => {
      axios.delete('http://localhost:8175/Leave/delete/${id}')
        .then(response => {
          console.log(response);
          fetchLeaveRequests();
        })
        .catch(error => {
          console.error('Error deleting leave request:', error);
        });
    };
  
    return (
      <>
        <header>
          <AdminNav/>
        </header>
        
        <form name='Leave' className='leave-form' onSubmit={submitLeaveRequest}>
          <h1>Leave Requests</h1>
          {/* Form to create a new leave request */}
          <h3>{isUpdateMode ? 'Update Leave Request' : 'Create Leave Request'}</h3>
          <div className=' L_inputs'>
            <label htmlFor=""> Employee ID</label>
            <input type="text" name="EmpID" value={newLeaveRequest.EmpID} onChange={handleInputChange} placeholder="Employee ID" />
  
            <label htmlFor=""> Your Name</label>
            <input type="text" name="name" value={newLeaveRequest.name} onChange={handleInputChange} placeholder="Your name" />
  
            <label htmlFor=""> Your Email</label>
            <input type="text" name="Email" value={newLeaveRequest.Email} onChange={handleInputChange} placeholder="Email" />
  
            <label htmlFor=""> Contact Number</label>
            <input type="text" name="Contact" value={newLeaveRequest.Contact} onChange={handleInputChange} placeholder="Contact Number" />
  
            <label htmlFor=""> Your Designation</label>
            <input type="text" name="Destination" value={newLeaveRequest.Destination} onChange={handleInputChange} placeholder="Destination" />
  
            <label htmlFor=""> Leave date from</label>
            <input type="date" name="LDateF" value={newLeaveRequest.LDateF} onChange={handleInputChange}  />
  
            <label htmlFor=""> Leave Date To</label>
            <input type="date" name="LdateT" value={newLeaveRequest.LdateT} onChange={handleInputChange}/>
  
            <label htmlFor=""> Leave Duration</label>
            <input type="text" name="Lduration" value={newLeaveRequest.Lduration} onChange={handleInputChange} placeholder="Leave Duration" />
  
            <label htmlFor=""> Attachments</label>
            <input type="file" name="attachments" onChange={handleFileInputChange} placeholder="Attachments" />
  
            <label htmlFor=""> Remark</label>
            {/* <input type="text" name="remarks" value={newLeaveRequest.remarks} onChange={handleInputChange} placeholder="Remarks" /> */}
            <textarea rows="5" name="remarks" value={newLeaveRequest.remarks} onChange={handleInputChange} placeholder="Your Remarks" />
  
            <label htmlFor="">Supervisor Name</label>
            <input type="text" name="Sup_name" value={newLeaveRequest.Sup_name} onChange={handleInputChange} placeholder="Supervisor Name" />
  
            <label htmlFor="">Supervisor Designation</label>
            <input type="text" name="Sup_des" value={newLeaveRequest.Sup_des} onChange={handleInputChange} placeholder="Supervisor Designation" />
  
            <label htmlFor="">Backup person</label>
            <input type="text" name="Backup" value={newLeaveRequest.Backup} onChange={handleInputChange} placeholder="Backup person" />
          </div>
          {/* Add other input fields similarly */}
          <button type="submit">{isUpdateMode ? 'Update' : 'Add'}</button>
        </form>
  
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th> Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th> Designation</th>
                <th>Leave date from</th>
                <th>Leave date To</th>
                <th> Leave Duration</th>
                <th>Attachments</th>
                <th>Remark</th>
                <th>Supervisor Name</th>
                <th>Supervisor Designation</th>
                <th>Backup person</th>
              </tr>
            </thead>
            <tbody>
              {LeaveRequests.map((leaveRequest) => (
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
                  <td>{leaveRequest.attachments}</td>
                  <td>{leaveRequest.remarks}</td>
                  <td>{leaveRequest.Sup_name}</td>
                  <td>{leaveRequest.Sup_des}</td>
                  <td>{leaveRequest.Backup}</td>
                  <td>
                    <button onClick={() => handleEditLeaveRequest(leaveRequest)}>Edit</button>
                    <button onClick={() => handleDeleteLeaveRequest(leaveRequest._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };
  
  export default  MyLeaves;
  