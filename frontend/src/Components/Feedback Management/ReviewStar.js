import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewStar = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const productReviews = reviews.filter((review) => review.productId === id);

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

  // Function to calculate average rating
  const calculateAverageRating = () => {
    if (productReviews.length === 0) return 0;

    const totalStars = productReviews.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    return totalStars / productReviews.length;
  };

  return (
    <>
      <div>
        {productReviews.length === 0 ? (
          <p className="text-gray-600">No reviews</p>
        ) : (
          <div>
            <div className="flex items-center">
              <span className="text-yellow-400">
                {Array.from(
                  { length: Math.round(calculateAverageRating()) },
                  (_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  )
                )}
              </span>
              <span className="ml-2 text-gray-600">
                ({calculateAverageRating().toFixed(1)})
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewStar;
