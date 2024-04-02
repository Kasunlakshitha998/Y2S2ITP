import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook

function OTPVerification() {
  const [otp, setOTP] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post(
        'http://localhost:8175/user/verify-otp',
        { otp }
      );
  
      if (response.status === 200) {
        if (response.data.status === "Success") {
          // Handle successful OTP verification
          setVerificationStatus("OTP verified successfully");
          navigate('/reset-password'); // Navigate to reset password page
        } else if (response.data.status === "Incorrect OTP") {
          // Handle case where OTP is incorrect
          setVerificationStatus("Incorrect OTP. Please try again.");
        } else {
          // Handle unexpected response
          setVerificationStatus("An error occurred. Please try again later.");
        }
      } else {
        // Handle non-200 status codes
        setVerificationStatus("Unexpected response status: " + response.status);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setVerificationStatus('Error verifying OTP: ' + error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>OTP Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="otp">
              <strong>Enter OTP</strong>
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              autoComplete="off"
              name="otp"
              className="form-control rounded-0"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Verify OTP
          </button>
          {verificationStatus && <p className="mt-3">{verificationStatus}</p>}
        </form>
      </div>
    </div>
  );
}

export default OTPVerification;
