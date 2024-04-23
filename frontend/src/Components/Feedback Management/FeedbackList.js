import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewStar from './ReviewStar';
import Cookies from 'js-cookie';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminNav from '../Nav/adminNav';

const FeedbackList = () => {
  const [reviews, setReviews] = useState([]);
  const userId = Cookies.get('userId');

  //get all feedback
  useEffect(() => {
    axios
      .get(`http://localhost:8175/feedback/`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  //delete feedback
  const handleDelete = (reviewId) => {
    axios
      .delete(`http://localhost:8175/feedback/delete/${reviewId}`)
      .then(() => {
        alert('Delete successfully');
        setReviews(reviews.filter((review) => review._id !== reviewId));
      })
      .catch((error) => {
        console.error('Error deleting :', error);
        alert('Delete unSuccessfully');
      });
  };

  return (
    <div className="max-w-3xl mx-10 overflow-y-auto">
      <header>
        <AdminNav />
      </header>
      <h2 className="text-3xl font-bold mb-6">Product Reviews</h2>
      <div className="border-t border-gray-200 pt-4"></div>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4 ml-60">
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews available</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg">
              <div className="p-4">
                <p className="text-lg font-semibold mb-2">
                  {review.feedbackType}
                </p>
                <p className="text-gray-600 mb-4">{review.email}</p>
                <p className="text-gray-800">{review.descript}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </span>
                  <span className="ml-2 text-gray-600">{review.rating}.0</span>
                </div>
              </div>
              <div className="">
                <button
                  className="bg-gray-400 hover:bg-red-700 text-white font-bold py-1 px-2 m-2 rounded"
                  onClick={() => handleDelete(review._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackList;
