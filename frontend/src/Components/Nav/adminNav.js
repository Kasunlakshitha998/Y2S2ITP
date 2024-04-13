import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './adminNav.css';

function AdminNav() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <header className="admin-header">
        <button className="burger-menu" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="logo">
          <Link to="/admin">Admin Dashboard</Link>
        </div>
        <div className="profile">
          <img src="profile.jpg" alt="Profile" />
          <span>Admin User</span>
          <div className="dropdown">
            <button className="dropbtn">▼</button>
            <div className="dropdown-content">
              <Link to="/AccountDetails">Profile</Link>
              <Link to="#">Settings</Link>
              <Link to="#">Logout</Link>
            </div>
          </div>
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li className={activeLink === '/admin' ? 'active' : ''}>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li className={activeLink === '/userdetails' ? 'active' : ''}>
            <Link to="/userdetails">Users</Link>
          </li>
          <li className={activeLink === '/staffdetails' ? 'active' : ''}>
            <Link to="/staffdetails">staff</Link>
          </li>
          <li className={activeLink === '/admin/productsList' ? 'active' : ''}>
            <Link to="/admin/productsList">Products</Link>
          </li>
          <li className={activeLink === '/orders' ? 'active' : ''}>
            <Link to="/orders">Orders</Link>
          </li>
          <li className={activeLink === '/appoinment' ? 'active' : ''}>
            <Link to="/appoinment">Appoinment</Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default AdminNav;
