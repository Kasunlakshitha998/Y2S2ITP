import React, { useState } from 'react';
import UserNav from '../Nav/userNav';
import Footer from '../Nav/footer';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function GiveFeedback() {
  const [feedbackType, setFeedbackType] = useState("");
  const [descript, setDescription] = useState("");

  const sendData = async (e) => {
    e.preventDefault();

    const newFeedback = {
      feedbackType,
      descript,
    };

    axios.post('http://localhost:8175/feedback/add', newFeedback)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Feedback Added Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        setDescription("");
        setFeedbackType("");
      })
      .catch((err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error with Feedback Submission',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err);
      });
  };

  const handleDropdownSelect = (selectedType) => {
    setFeedbackType(selectedType);
  };

  return (
    <>
      <UserNav />
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={sendData}>
          <h2 className="text-2xl mb-4">Give your feedback</h2>
          <div className="mt-4">
            <label htmlFor="feedbackType" className="block">Feedback Type:</label>
            <select
              id="feedbackType"
              name="feedbackType"
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Feedback Type</option>
              <option value="Product">Product</option>
              <option value="Repair Services">Repair Services</option>
              <option value="Delivery Services">Delivery Services</option>
              <option value="Promotional">Promotional</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="description" className="block">Description:</label>
            <textarea
              id="description"
              name="description"
              value={descript}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
