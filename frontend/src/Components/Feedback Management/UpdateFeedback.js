import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UpdateFeedback() {
  const { id } = useParams();
  const [feedbackType, setFeedbackType] = useState('');
  const [email, setFeedbackEmail] = useState('');
  const [pid, setpid] = useState('');
  const [descript, setDescription] = useState('');
  const [rating, setFeedbackRating] = useState(0);
  const [satisfaction, setSatisfaction] = useState('');
  const [recommend, setRecommend] = useState('');
  const [purchaseAgain, setPurchaseAgain] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`http://localhost:8175/feedback/get/${id}`)
      .then((response) => {
        const feedback = response.data.feedback;
        setFeedbackType(feedback.feedbackType);
        setFeedbackEmail(feedback.email);
        setDescription(feedback.descript);
        setFeedbackRating(feedback.rating);
        setpid(feedback.productId);
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
      satisfaction,
      recommend,
      purchaseAgain
    };

    axios
      .put(`http://localhost:8175/feedback/update/${id}`, updatedFeedback)
      .then(() => {
        alert('Feedback Successfully Updated');
        navigate('/');
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
            required
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
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating:</label>
          <select
            name="rating"
            value={rating}
            onChange={(e) => setFeedbackRating(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="satisfaction" className="block text-sm font-medium text-gray-700">How satisfied are you with our product/service?</label>
          <select
            id="satisfaction"
            name="satisfaction"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={satisfaction}
            onChange={(e) => setSatisfaction(e.target.value)}
            required
          >
            <option value="">Select Satisfaction Level</option>
            <option value="1">Not Satisfied</option>
            <option value="2">Somewhat Satisfied</option>
            <option value="3">Satisfied</option>
            <option value="4">Very Satisfied</option>
            <option value="5">Extremely Satisfied</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="recommend" className="block text-sm font-medium text-gray-700">How likely are you to recommend our product/service to a friend or colleague?</label>
          <select
            id="recommend"
            name="recommend"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={recommend}
            onChange={(e) => setRecommend(e.target.value)}
            required
          >
            <option value="">Select Likelihood to Recommend</option>
            <option value="1">Not Likely</option>
            <option value="2">Somewhat Likely</option>
            <option value="3">Likely</option>
            <option value="4">Very Likely</option>
            <option value="5">Extremely Likely</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="purchaseAgain" className="block text-sm font-medium text-gray-700">How likely are you to purchase from us again in the future?</label>
          <select
            id="purchaseAgain"
            name="purchaseAgain"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={purchaseAgain}
            onChange={(e) => setPurchaseAgain(e.target.value)}
            required
          >
            <option value="">Select Likelihood to Purchase Again</option>
            <option value="1">Not Likely</option>
            <option value="2">Somewhat Likely</option>
            <option value="3">Likely</option>
            <option value="4">Very Likely</option>
            <option value="5">Extremely Likely</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Review:
          </label>
          <textarea
            required
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
