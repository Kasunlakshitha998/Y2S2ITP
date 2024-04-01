import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './adminNav.css';

function AdminNav() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <>
      <div className="admin-header">
        <div className="logo">
          <Link to="/">Admin Panel</Link>
        </div>
        <div className="profile">
          <img src="profile.jpg" alt="Profile Picture" />
          <span>Admin User</span>
          <div className="dropdown">
            <button className="dropbtn">▼</button>
            <div className="dropdown-content">
              <Link to="#">Profile</Link>
              <Link to="#">Settings</Link>
              <Link to="#">Logout</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar">
        <ul>
          <li className={activeLink === '/admin' ? 'active' : ''}>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li className={activeLink === '/users' ? 'active' : ''}>
            <Link to="/users">Users</Link>
          </li>
          <li className={activeLink === '/admin/productsList' ? 'active' : ''}>
            <Link to="/admin/productsList">Products</Link>
          </li>
          <li className={activeLink === '/orders' ? 'active' : ''}>
            <Link to="/orders">Orders</Link>
          </li>
          <li className={activeLink === '/settings' ? 'active' : ''}>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminNav;
