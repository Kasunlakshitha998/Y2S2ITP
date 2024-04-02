import { useState } from "react";

import axios from 'axios'
import { useNavigate } from "react-router-dom";

function CreateUsers() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const [number, setNumber] = useState(""); // Assuming this is for mobile number
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !reenterPassword || !number) {
          alert("All fields must be filled");
          return;
      }

        // Validate name (should contain only letters)
        const nameRegex = /^[a-zA-Z]+$/;
        if (!name.match(nameRegex)) {
            alert("Name should only contain letters");
            return;
        }

        // Check if passwords match
        if (password !== reenterPassword) {
            alert("Passwords do not match");
            return;
        }

        

        const validNumberLength = 10;
        if (number.length !== validNumberLength) {
            alert("Mobile number should be 10 digits");
            return;
        }

        axios.post('http://localhost:8175/user/register', { name, email, password, number })
  .then(result => {
    console.log(result);
    navigate('/userdetails');
  })
  .catch(err => {
    if (err.response && err.response.data.error === 'Email is already in use') {
      alert('Email is already in use. Please use a different email.');
    } else {
      console.log(err);
    }
  });

      
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                            value={email}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="reenterPassword">
                            <strong>Reenter Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Reenter password"
                            name="reenterPassword"
                            className="form-control rounded-0"
                            value={reenterPassword}
                            onChange={(e) => setReenterPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number">
                            <strong>Mobile Number</strong>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter mobile number"
                            name="number"
                            className="form-control rounded-0"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Submit
                    </button>
                </form>
               
               
            </div>
        </div>
    );
}

export default CreateUsers;
