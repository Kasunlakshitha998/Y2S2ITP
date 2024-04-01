import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './userNav.css';

function UserNav() {
  const location = useLocation();

  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="navUser">
            Tech Connect
          </Link>
        </div>
        <nav>
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">Mobile Phones</Link>
            </li>
            <li
              className={location.pathname === '/accessories' ? 'active' : ''}
            >
              <Link to="/accessories">Accessories</Link>
            </li>
            <li
              className={
                location.pathname === '/repair-services' ? 'active' : ''
              }
            >
              <Link to="/repair-services">Repair Services</Link>
            </li>
          </ul>
        </nav>

        <form className="search-form" action="#" method="get">
          <input type="text" name="search" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>

        <div className="sub-nav">
          <div className="register-signin">
            <Link to="#" className="register-btn">
              Register
            </Link>
            <Link to="#" className="signin-btn">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNav;
