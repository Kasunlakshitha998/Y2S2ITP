// MyLeaves.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Myleaves.Scss";
import StaffNav from '../../Components/Nav/staffnav';
import Cookies from 'js-cookie';

const MyLeaves = () => {
  const userId = Cookies.get('userId');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [LeaveRequestToUpdate,setLeaveRequestToUpdate]= useState(null); 
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    EmpID: userId,
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
            EmpID: userId,
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

  const filteredLeaveRequests = leaveRequests.filter((request) => {
    return request.EmpID.includes(userId);
  });

  return (
    <>
      <StaffNav />

      <div className="max-w-full ml-48 mt-20 mr-2">
        <form
          action=""
          className="leave-form max-w-2xl ml-40 shadow-lg rounded-lg p-6 mb-5"
          onSubmit={submitLeaveRequest}
        >
          <h1>Leave Requests</h1>
          <h2>Create New Leave Request</h2>
          <div className=" L_inputs">
            <div className="form-left">
              {/* <div className="form-row">
                <label htmlFor="">Employee ID</label>
                <input
                  type="text"
                  name="EmpID"
                  value={newLeaveRequest.EmpID}
                  onChange={handleInputChange}
                  placeholder="Employee ID"
                />
              </div> */}
              <div className="form-row">
                <label htmlFor="">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={newLeaveRequest.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                />
              </div>
              <div className="form-row">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="Email"
                  value={newLeaveRequest.Email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-row">
                <label htmlFor="">Contact Number</label>
                <input
                  type="text"
                  name="Contact"
                  value={newLeaveRequest.Contact}
                  onChange={handleInputChange}
                  placeholder="Contact Number"
                />
              </div>

              <div className="form-row">
                <label htmlFor="">Designation</label>
                <input
                  type="text"
                  name="Destination"
                  value={newLeaveRequest.Destination}
                  onChange={handleInputChange}
                  placeholder="Designation"
                />
              </div>

              <div className="form-row">
                <label htmlFor="">Leave Date from</label>
                <input
                  type="date"
                  name="LDateF"
                  value={newLeaveRequest.LDateF}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <label htmlFor="">Leave Date To</label>
                <input
                  type="date"
                  name="LdateT"
                  value={newLeaveRequest.LdateT}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-right">
              <div className="form-row">
                <label htmlFor="">Leave Type</label>
                <input
                  type="text"
                  name="LType"
                  value={newLeaveRequest.LType}
                  onChange={handleInputChange}
                  placeholder="Leave Type"
                />
              </div>

              <div className="form-row">
                <label htmlFor="">Leave Duration</label>
                <input
                  type="text"
                  name="Lduration"
                  value={newLeaveRequest.Lduration}
                  onChange={handleInputChange}
                  placeholder="Leave Duration"
                />
              </div>

              <div className="form-row">
                <label htmlFor="">Attachments</label>
                <input
                  type="file"
                  name="attachments"
                  value={newLeaveRequest.attachments}
                  onChange={handleInputChange}
                  placeholder="Attachments"
                />
              </div>

              <div className="form-row">
                <label htmlFor="">Remarks</label>
                <input
                  type="text"
                  name="remarks"
                  value={newLeaveRequest.remarks}
                  onChange={handleInputChange}
                  placeholder="Remarks"
                />
              </div>

              <div className="form-row">
                <label htmlFor="">Supervisor Name</label>
                <input
                  type="text"
                  name="Sup_name"
                  value={newLeaveRequest.Sup_name}
                  onChange={handleInputChange}
                  placeholder="Supervisor Name"
                />
              </div>

              <div className="form-row">
                <label htmlFor="">Supervisor Designation</label>
                <input
                  type="text"
                  name="Sup_des"
                  value={newLeaveRequest.Sup_des}
                  onChange={handleInputChange}
                  placeholder="Supervisor Designation"
                />
              </div>

              <div className="form-row">
                <label htmlFor="">Backup Person</label>
                <input
                  type="text"
                  name="Backup"
                  value={newLeaveRequest.Backup}
                  onChange={handleInputChange}
                  placeholder="Backup person"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button className="w-25 mt-4" type="submit">
              {isUpdateMode ? 'Update' : 'Add'}
            </button>
            <button className="w-25 mt-4" onClick={clearForm}>
              Cancel
            </button>
          </div>
        </form>
        <div className="table-container">
          <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="py-2 px-4">Name</th>
                <th class="py-2 px-4">Email</th>
                <th class="py-2 px-4">Designation</th>
                <th class="py-2 px-4">Leave Date from</th>
                <th class="py-2 px-4">Leave Date To</th>
                <th class="py-2 px-4">Leave Type</th>
                <th class="py-2 px-4">Leave Duration</th>
                <th class="py-2 px-4">Remarks</th>
                <th class="py-2 px-4">Supervisor Name</th>
                <th class="py-2 px-4">Supervisor Designation</th>
                <th class="py-2 px-4">Backup Person</th>
                <th class="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {filteredLeaveRequests.map((leaveRequest) => (
                <tr key={leaveRequest._id}>
                  <td class="py-2 px-4">{leaveRequest.name}</td>
                  <td class="py-2 px-4">{leaveRequest.Email}</td>
                  <td class="py-2 px-4">{leaveRequest.Destination}</td>
                  <td class="py-2 px-4">{leaveRequest.LDateF}</td>
                  <td class="py-2 px-4">{leaveRequest.LdateT}</td>
                  <td class="py-2 px-4">{leaveRequest.LType}</td>
                  <td class="py-2 px-4">{leaveRequest.Lduration}</td>
                  <td class="py-2 px-4">{leaveRequest.remarks}</td>
                  <td class="py-2 px-4">{leaveRequest.Sup_name}</td>
                  <td class="py-2 px-4">{leaveRequest.Sup_des}</td>
                  <td class="py-2 px-4">{leaveRequest.Backup}</td>
                  <td class="py-2 px-4">
                    {leaveRequest.Status === 'Pending' ? (
                      <>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleEditLeaveRequest(leaveRequest)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() =>
                            handleDeleteLeaveRequest(leaveRequest._id)
                          }
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <span>{leaveRequest.Status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyLeaves;
