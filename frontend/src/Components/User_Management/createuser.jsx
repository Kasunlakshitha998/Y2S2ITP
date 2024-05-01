import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AdminNav from '../Nav/adminNav';
import Swal from 'sweetalert2';

function CreateUsers() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const [number, setNumber] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !reenterPassword || !number) {
            alert("All fields must be filled");
            return;
        }

        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!name.match(nameRegex)) {
            
            Swal.fire({
                icon: 'error',
                title: 'error...',
                text: 'Name should only contain letters.',
            });
            return;
        }

        if (password !== reenterPassword) {
           
            Swal.fire({
                icon: 'error',
                title: 'error...',
                text: 'Passwords do not match.',
            });
            
            return;
        }

        const validNumberLength = 10;
        if (number.length !== validNumberLength) {
    
             
            Swal.fire({
                icon: 'error',
                title: 'error...',
                text: 'Mobile number should be 10 digits.',
            });
            
        
            return;
        }

        axios.post('http://localhost:8175/user/Adduser', { name, email, password, number })
            .then(result => {
                console.log(result);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "user successful added",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/userdetails');
            })
            .catch(err => {
                if (err.response && err.response.data.error ) {
                    
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Email is already in use. Please use a different email.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                } else {
                    console.log(err);
                }
            });
    }

    return (
        <div className="container h-screen d-flex justify-content-center align-items-center">
             <AdminNav /> 
             <div className="form-container">
                <h2>Add users</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            autoComplete="off"
                            name="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="reenterPassword" className="form-label">Reenter Password</label>
                        <input
                            type="password"
                            placeholder="Reenter password"
                            name="reenterPassword"
                            className="form-control"
                            value={reenterPassword}
                            onChange={(e) => setReenterPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number" className="form-label">Mobile Number</label>
                        <input
                            type="number"
                            placeholder="Enter mobile number"
                            name="number"
                            className="form-control"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateUsers;
