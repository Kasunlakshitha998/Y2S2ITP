import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateFeedback() {
  const { id } = useParams();
  const [feedbackType, setFeedbackType] = useState('');
  const [email, setFeedbackEmail] = useState('');
  const [descript, setDescription] = useState('');
  const [rating, setFeedbackRating] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8175/feedback/get/${id}`)
      .then((response) => {
        const feedback = response.data.feedback;
        setFeedbackType(feedback.feedbackType);
        setFeedbackEmail(feedback.email);
        setDescription(feedback.descript);
        setFeedbackRating(feedback.rating);
      })
      .catch((error) => {
        console.error('Error fetching feedback:', error);
      });
  }, [id]);

  const updateFeedback = (e) => {
    e.preventDefault();

    const updatedFeedback = {
      feedbackType,
      email,
      rating,
      descript,
    };

    axios
      .put(`http://localhost:8175/feedback/update/${id}`, updatedFeedback)
      .then(() => {
        alert('Feedback Successfully Updated');
      })
      .catch((err) => {
        alert('Error updating feedback');
        console.error(err);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={updateFeedback}>
        <h2 className="text-2xl font-bold mb-4">Edit Feedback</h2>

        <div className="mb-4">
          <label
            htmlFor="feedbackType"
            className="block text-sm font-medium text-gray-700"
          >
            Feedback Type:
          </label>
          <select
            id="feedbackType"
            name="feedbackType"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value)}
          >
            <option value="">Select Feedback Type</option>
            <option value="Product">Product</option>
            <option value="Repair Services">Repair Services</option>
            <option value="Delivery Services">Delivery Services</option>
            <option value="Promotional">Promotional</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setFeedbackEmail(e.target.value)}
            placeholder="Your Email"
            className="mt-1 block w-full border border-gray-900 p-2"
          />
        </div>
        <select
          name="rating"
          value={rating}
          onChange={(e) => setFeedbackRating(e.target.value)}
          className="input-field"
        >
          <option value="">Select Rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Review:
          </label>
          <textarea
            id="description"
            name="description"
            value={descript}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateFeedback;
