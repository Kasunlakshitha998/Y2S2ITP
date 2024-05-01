import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './adminNav.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BsPersonFill } from 'react-icons/bs'; 
import Swal from 'sweetalert2';



function StaffNav() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userImage, setUserImage] = useState(null); //

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
        axios.get(`http://localhost:8175/user/getUsers/${userId}`)
            .then(result => {
             
                setUserImage(result.data.image);
            })
            .catch(err => console.log(err));
    }
}, []);

const handleClickProfilePicture = () => {
   
  Swal.fire({
      imageUrl: `http://localhost:3000/image/${userImage}`,
      imageAlt: 'Profile Picture',
      showCloseButton: true,
      showConfirmButton: false,
      width: '20%',
      height: 'auto',
  });
};


  const logout = () => {
    // Clear frontend cookies
    Cookies.remove('token');
    Cookies.remove('userEmail');
    Cookies.remove('userId');
    Cookies.remove('role');
    
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <>
      <header className="admin-header">
        <button className="burger-menu" onClick={toggleSidebar}></button>
        <div className="logo">
          <Link to="/admin">Staff Dashboard</Link>
        </div>
        <div className="profile">
          {userImage ? (
            <img
              src={`http://localhost:3000/image/${userImage}`}
              alt="Profile"
              onClick={handleClickProfilePicture}
            />
          ) : (
            <BsPersonFill size={100} color="#adb5bd" />
          )}

          <span>Admin User</span>
          <div className="dropdown">
            <button className="dropbtn">▼</button>
            <div className="dropdown-content">
              <Link to="/AccountDetails">Profile</Link>
              <Link to="#">Settings</Link>
              <Link onClick={logout}>Logout</Link> {/* Call logout function */}
            </div>
          </div>
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li className={activeLink === '' ? 'active' : ''}>
            <Link to="">Dashboard</Link>
          </li>
          
          
          <li className={activeLink === '' ? 'active' : ''}>
            <Link to="">Leave</Link>
          </li>
          
          <li className={activeLink === '' ? 'active' : ''}>
            <Link to="">FeedBack</Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default StaffNav;
