import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffNav from '../../Components/Nav/staffnav';
import './Myleaves.Scss';
import Cookies from 'js-cookie';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MyLeaves = () => {
  const userId = Cookies.get('userId');
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
    Backup: '',
  });
  const [LeaveRequestToUpdate, setLeaveRequestToUpdate] = useState(null);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = () => {
    axios
      .get('http://localhost:8175/Leave/')
      .then((result) => setLeaveRequests(result.data))
      .catch((err) => console.log(err));
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
      if (key === 'LDateF' || key === 'LdateT') {
        // Convert date fields to ISO string format
        formData.append(key, new Date(newLeaveRequest[key]).toISOString());
      } else {
        formData.append(key, newLeaveRequest[key]);
      }
    }
    if (isUpdateMode && LeaveRequestToUpdate) {
      formData.append('_id', LeaveRequestToUpdate._id); // Append id for update
      axios
        .put(
          `http://localhost:8175/Leave/update/${LeaveRequestToUpdate._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((result) => {
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
            Backup: '',
          });
          fetchLeaveRequests();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post('http://localhost:8175/Leave/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((result) => {
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
            Backup: '',
          });
          fetchLeaveRequests();
        })
        .catch((err) => console.log(err));
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
      Backup: leaveRequest.Backup,
    });
    setIsUpdateMode(true);
  };

  const handleDeleteLeaveRequest = (id) => {
    axios
      .delete(`http://localhost:8175/Leave/delete/${id}`)
      .then((response) => {
        console.log(response);
        fetchLeaveRequests();
      })
      .catch((error) => {
        console.error('Error deleting leave request:', error);
      });
  };

  return (
    <>
      <header>
        <StaffNav />
      </header>

      <main className="ml-48 mt-20 w-10/12 mr-20">
        <form name="Leave" className="leave-form" onSubmit={submitLeaveRequest}>
          <h1>Leave Requests</h1>
          {/* Form to create a new leave request */}
          <h3>
            {isUpdateMode ? 'Update Leave Request' : 'Create Leave Request'}
          </h3>
          <div className=" L_inputs">
            <label htmlFor=""> Employee ID</label>
            <input
              type="text"
              name="EmpID"
              value={newLeaveRequest.EmpID}
              onChange={handleInputChange}
              placeholder="Employee ID"
            />

            <label htmlFor=""> Your Name</label>
            <input
              type="text"
              name="name"
              value={newLeaveRequest.name}
              onChange={handleInputChange}
              placeholder="Your name"
            />

            <label htmlFor=""> Your Email</label>
            <input
              type="text"
              name="Email"
              value={newLeaveRequest.Email}
              onChange={handleInputChange}
              placeholder="Email"
            />

            <label htmlFor=""> Contact Number</label>
            <input
              type="text"
              name="Contact"
              value={newLeaveRequest.Contact}
              onChange={handleInputChange}
              placeholder="Contact Number"
            />

            <label htmlFor=""> Your Designation</label>
            <input
              type="text"
              name="Destination"
              value={newLeaveRequest.Destination}
              onChange={handleInputChange}
              placeholder="Destination"
            />

            <label htmlFor=""> Leave date from</label>
            <input
              type="date"
              name="LDateF"
              value={newLeaveRequest.LDateF}
              onChange={handleInputChange}
            />

            <label htmlFor=""> Leave Date To</label>
            <input
              type="date"
              name="LdateT"
              value={newLeaveRequest.LdateT}
              onChange={handleInputChange}
            />

            <label htmlFor=""> Leave Duration</label>
            <input
              type="text"
              name="Lduration"
              value={newLeaveRequest.Lduration}
              onChange={handleInputChange}
              placeholder="Leave Duration"
            />

            <label htmlFor=""> Attachments</label>
            <input
              type="file"
              name="attachments"
              onChange={handleFileInputChange}
              placeholder="Attachments"
            />

            <label htmlFor=""> Remark</label>
            {/* <input type="text" name="remarks" value={newLeaveRequest.remarks} onChange={handleInputChange} placeholder="Remarks" /> */}
            <textarea
              rows="5"
              name="remarks"
              value={newLeaveRequest.remarks}
              onChange={handleInputChange}
              placeholder="Your Remarks"
            />

            <label htmlFor="">Supervisor Name</label>
            <input
              type="text"
              name="Sup_name"
              value={newLeaveRequest.Sup_name}
              onChange={handleInputChange}
              placeholder="Supervisor Name"
            />

            <label htmlFor="">Supervisor Designation</label>
            <input
              type="text"
              name="Sup_des"
              value={newLeaveRequest.Sup_des}
              onChange={handleInputChange}
              placeholder="Supervisor Designation"
            />

            <label htmlFor="">Backup person</label>
            <input
              type="text"
              name="Backup"
              value={newLeaveRequest.Backup}
              onChange={handleInputChange}
              placeholder="Backup person"
            />
          </div>
          {/* Add other input fields similarly */}
          <button type="submit">{isUpdateMode ? 'Update' : 'Add'}</button>
        </form>

        <div className="table-container">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Designation</th>
                <th className="border px-4 py-2">Leave date from</th>
                <th className="border px-4 py-2">Leave date To</th>
                <th className="border px-4 py-2">Leave Type</th>
                <th className="border px-4 py-2">Leave Duration</th>
                <th className="border px-4 py-2">Attachments</th>
                <th className="border px-4 py-2">Remark</th>
                <th className="border px-4 py-2">Supervisor Name</th>
                <th className="border px-4 py-2">Supervisor Designation</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {LeaveRequests.map((leaveRequest) => (
                <tr key={leaveRequest._id}>
                  <td className="border px-4 py-2">{leaveRequest.name}</td>
                  <td className="border px-4 py-2">{leaveRequest.Email}</td>
                  <td className="border px-4 py-2">
                    {leaveRequest.Destination}
                  </td>
                  <td className="border px-4 py-2">{leaveRequest.LDateF}</td>
                  <td className="border px-4 py-2">{leaveRequest.LdateT}</td>
                  <td className="border px-4 py-2">{leaveRequest.LType}</td>
                  <td className="border px-4 py-2">{leaveRequest.Lduration}</td>
                  <td className="border px-4 py-2">
                    {leaveRequest.attachments}
                  </td>
                  <td className="border px-4 py-2">{leaveRequest.remarks}</td>
                  <td className="border px-4 py-2">{leaveRequest.Sup_name}</td>
                  <td className="border px-4 py-2">{leaveRequest.Sup_des}</td>
                  <td className="border px-4 py-2">{leaveRequest.Status}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleEditLeaveRequest(leaveRequest)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDeleteLeaveRequest(leaveRequest._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default MyLeaves;
