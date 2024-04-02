import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
    const [Password, setPassword] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //axios.defaults.withCredentials = true;

        try {
            const response = await axios.post(
              'http://localhost:8175/user/reset-password',
              { Password }
            );

            if (response.status === 200) {
                if (response.data.status === "Password reset successfully") {
                    // Handle successful password reset
                    setVerificationStatus("Password reset successfully");
                    navigate('/login'); // Navigate to login page
                } else if (response.data.status === "User not found") {
                    // Handle case where user is not found
                    setVerificationStatus("User not found");
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
            setVerificationStatus('Error resetting password: ' + error.message);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h4>Reset Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>New Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Update
                    </button>
                </form>
                {verificationStatus && <p>{verificationStatus}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;
