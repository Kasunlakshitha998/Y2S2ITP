import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library
import Swal from 'sweetalert2';

function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8175/user/login', { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.status === 'success') {
          // Set cookies for token and user email
          Cookies.set('token', result.data.token, { expires: 1 }); // Expires in 1 day
          Cookies.set('userEmail', email, { expires: 1 }); // Expires in 1 day

          // Display alert for successful login
         
          

          // Check if the user is an admin
          const isAdmin = result.data.isAdmin;

          // Navigate to the appropriate dashboard based on user type
          if (isAdmin) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Login successful!",
              showConfirmButton: false,
              timer: 1500
              
            });


            navigate('/admin'); // Replace with your admin dashboard route
          } else {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Login successful!",
              showConfirmButton: false,
              timer: 1500
              
            });
            navigate('/'); // Replace with your regular user dashboard route
          }
        } else if (result.data.status === 'no record existed') {
          // Display alert for email not found
          alert('Email does not exist. Please register.');
        } else {
          // Display alert for unexpected response
          alert('Unexpected response from the server');
        }
      })
      .catch((err) => {
        console.log(err);
        // Display alert for general error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email or password incorrect please enter valied password or email",
          
        });

        
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
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
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <p>Already Have an Account</p>
        <Link to="/forgot-password" className="text-decoration-none">
          Forgot Password
        </Link>
        <br />
        <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
