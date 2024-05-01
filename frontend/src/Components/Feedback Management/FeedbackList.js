import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaFileCsv } from 'react-icons/fa';
import AdminNav from '../Nav/adminNav';

const FeedbackList = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Get all feedback
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

  // Delete feedback
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

  // Generate CSV report
  const handleReport = () => {
    // Format the feedback data into CSV format
    const tableHeader = 'Email,Feedback Type,Rating,Description';
    const feedbackCSV = [tableHeader]
      .concat(
        reviews.map((review) => {
          return `${review.email},${review.feedbackType},${review.rating},${review.descript}`;
        })
      )
      .join('\n');

    // Create a Blob object containing the CSV data
    const blob = new Blob([feedbackCSV], { type: 'text/csv' });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'feedback_report.csv');

    // Simulate a click on the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the temporary link and URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const filteredFeedback = reviews.filter((review) =>
    review.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-8xl mx-10 overflow-y-auto">
      <header>
        <AdminNav />
      </header>
      <h2 className="text-3xl font-bold mx-auto max-w-10xl p-5 text-center">Product Reviews</h2>
      <div className="border-t border-gray-200 pt-4"></div>
      <div className="flex items-center justify-between ml-60">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-2xl my-4 p-2 border border-gray-300 rounded-lg"
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleReport}
        >
          <FaFileCsv /> Get Report
        </button>
      </div>

      {filteredFeedback.length === 0 ? (
        <p className="text-gray-600">No reviews available</p>
      ) : (
        <div id="feedback-list" className="grid grid-cols-2 md:grid-cols-1 gap-4 ml-60">
          {filteredFeedback.map((review, index) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
