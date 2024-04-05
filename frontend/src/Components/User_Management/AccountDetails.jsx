import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import './AccountDetails.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


function AccountDetails() {
    //const { userEmail} = Cookies.get('userEmail')
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const navigate = useNavigate(); // Use useNavigate hook to get the navigate function

    useEffect(() => {
        const userEmail = Cookies.get('userEmail');
        if (userEmail) {
            axios.get(`http://localhost:8175/user/getUsers/${userEmail}`)
                .then(result => {
                    setName(result.data.name);
                    setEmail(result.data.email);
                    setNumber(result.data.number);
                })
                .catch(err => console.log(err));
        }
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();

        // Your validation and axios post request code...

        axios
            .post('http://localhost:8175/user/AccountDetails', {
                name,
                email,
                number,
                userEmail: Cookies.get('userEmail') // Changed from 'const userEmail'
            })
            .then((result) => {
                console.log(result);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Update successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
                navigate('/AccountDetails'); // Navigate to '/login' upon successful submission
            })
            .catch((err) => {
                if (
                    err.response &&
                    err.response.data.error === 'Email is already in use'
                ) {
                    alert('Email is already in use. Please use a different email.');
                } else {
                    console.log(err);
                }
            });
    }




    return (
        <div className="container-xl px-4 mt-4">
            <nav className="nav nav-borders">
                <button className="nav-link active ms-0">Profile</button>
                <button className="nav-link">Billing</button>
                <button className="nav-link">
                    <Link to="/SecuritySettings">Security</Link>
                </button>
            </nav>
            <hr className="mt-0 mb-4" />
            <div className="row">
                <div className="col-xl-4">
                    <div className="card mb-4 mb-xl-0">
                        <div className="card-header">Profile Picture</div>
                        <div className="card-body text-center">
                            <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                            <button className="btn btn-primary" type="button">Upload new image</button>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="card mb-4">
                        <div className="card-header">Account Details</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                                    <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                    <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                        <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value={number} onChange={(e) => setNumber(e.target.value)} />
                                    </div>
                                </div>
                                <button className="btn btn-primary" type="submit" >Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;
