import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8175/user/forgot-password', { email })
      .then((result) => {
        console.log(result);
        if (result) {
          // Display alert for successful email sent
          Swal.fire({
            title: "Email sent successfully!",
            text: "Please check your inbox to reset your password",
            icon: "success"
          });
          Cookies.set('token', result.data.token, { expires: 1 }); // Expires in 1 day
          Cookies.set('userEmail', email, { expires: 1 }); // Expires in 1 day
          // Navigate the user to the appropriate page
          navigate('/verify-otp');
        } else if (result.data.status === 'no record existed') {
          // Display alert for email not found
          alert('Email does not exist. Please register.');
        } else {
          // Display alert for unexpected response
          alert('An error occurred. Please try again later.');
        }
      })
      .catch((err) => {
        console.log(err);
        // Display alert for general error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email is wrong",
          
        });
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Forget password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
