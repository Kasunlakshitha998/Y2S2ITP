import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './../Nav/adminNav';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function LeaveList() {
  const [leaves, setLeave] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchleave = async () => {
      try {
        const response = await axios.get('http://localhost:8175/Leave/');
        setLeave(response.data);
      } catch (error) {
        console.error('Error fetching Leave:', error);
      }
    };

    fetchleave();
  }, []);

  const handleApproval = (e, leaveId) => {
    // Add 'e' parameter for the event object
    e.preventDefault(); // Prevent default form submission

    const updatedLeave = {
      Status: 'Approved', // Assuming 'Status' is what you want to update, modify it accordingly
    };

    axios
      .put(`http://localhost:8175/leave/update/${leaveId}`, updatedLeave)
      .then(() => {
          alert('Update successfully');
          window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating leave:', error);
        alert('Failed to update leave');
      });
    };
    
    const handleReject = (e, leaveId) => {
      // Add 'e' parameter for the event object
      e.preventDefault(); // Prevent default form submission

      const updatedLeave = {
        Status: 'Reject', // Assuming 'Status' is what you want to update, modify it accordingly
      };

      axios
        .put(`http://localhost:8175/leave/update/${leaveId}`, updatedLeave)
        .then(() => {
          alert('Update successfully');
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error updating leave:', error);
          alert('Failed to update leave');
        });
    };

  const handleGenerateReport = () => {
    html2canvas(document.querySelector('#order-table')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgHeight = (canvas.height * 208) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, 208, imgHeight);
      pdf.save('orders_report.pdf');
    });
  };

  const filteredleave = leaves.filter((leave) =>
    leave.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
        <AdminNav />
      </header>
      <main className="plist ml-48">
        <div className="flex justify-between items-center">
          <div>
            <input
              type="text"
              placeholder="Search by Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-2xl my-4 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <button
              onClick={handleGenerateReport}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Generate Report
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg flex flex-row justify-center">
          <table
            id="order-table"
            className="max-w-3xl text-sm text-left text-gray-900"
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th className="px-4 py-2">Leave ID</th>
                <th className="px-4 py-2">name</th>
                <th className="px-4 py-2">LType</th>
                <th className="px-4 py-2">duration</th>
                <th className="px-4 py-2">remarks</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2"> Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredleave.map((leave) => (
                <tr key={leave._id}>
                  <td className="border px-4 py-2">{leave._id}</td>
                  <td className="border px-4 py-2">{leave.name}</td>
                  <td className="border px-4 py-2">{leave.LType}</td>
                  <td className="border px-4 py-2">{leave.Lduration}</td>
                  <td className="border px-4 py-2"> {leave.remarks} </td>
                  <td className="border px-4 py-2">{leave.Contact}</td>
                  <td className="border px-4 py-2">{leave.Status}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 m-2 rounded"
                      onClick={(e) => handleReject(e, leave._id)} // Pass event object and leave id
                    >
                      Reject
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 m-2 rounded"
                      onClick={(e) => handleApproval(e, leave._id)} // Pass event object and leave id
                    >
                      Approval
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
}

export default LeaveList;
