import React from 'react';
import axios from 'axios';

const DeleteFeedback = ({ feedbackId }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:8175/feedback/delete/${feedbackId}`)
      .then(response => {
        console.log(response.data);
        // Handle successful deletion, e.g., redirect or update UI
      })
      .catch(error => {
        console.error('Error deleting feedback:', error);
        // Handle error, e.g., show error message
      });
  };

  return (
    <button onClick={handleDelete}>Delete Feedback</button>
  );
};

export default DeleteFeedback;