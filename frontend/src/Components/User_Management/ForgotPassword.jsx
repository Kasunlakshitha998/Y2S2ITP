import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8175/user/forgot-password', { email })
      .then((result) => {
        console.log(result);
        if (result.data.status === 'success') {
          // Display alert for successful email sent
          alert(
            'Email sent successfully. Please check your inbox to reset your password.'
          );
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
        alert('An error occurred. Please try again later.');
      });
  };

<<<<<<< HEAD
   //axios.defaults.withCredentials=true;
   const handleSubmit = (e) => {
     e.preventDefault();
     axios
       .post('http://localhost:8175/user/forgot-password', { email })
       .then((result) => {
         console.log(result);
         if (result) {
           // Display alert for successful email sent
           alert("Email sent successfully. Please check your inbox to reset your password.");
          navigate('/verify-otp'); 
           // navigate('/login');
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
         alert(
           'Email sent successfully. Please check your inbox to reset your password.'
         );
       });
   }
   
=======
>>>>>>> da275b8e824f956676db3e8d212d1007cbf46c56
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
