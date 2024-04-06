import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import './userNav.css';

function UserNav() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };


  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <>
      <nav className="bg-gray-800 text-white fixed w-full z-20 top-0 start-0 border-b border-gray-100 p-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-3xl font-semibold whitespace-nowrap">
              Tech Connect
            </span>
          </Link>
          <div className="flex p-0 md:order-2 space-x-3 md:space-x-0">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center p-0 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? '' : 'hidden'
            }`}
          >
            <ul className="flex flex-col p-1 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-3 md:order-2">
            <button className="focus:outline-none">
              <FaShoppingCart className="w-8 h-8 text-gray-500 hover:text-gray-900" />
            </button>
            <button onMouseMove={toggleProfile} className="focus:outline-none">
              <FaUserCircle className="w-8 h-8 text-gray-500 hover:text-gray-900" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <ul>
                  <li>
                    <Link to="#" className="block py-2 px-4 hover:bg-gray-100">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="block py-2 px-4 hover:bg-gray-100">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="block py-2 px-4 hover:bg-gray-100">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default UserNav;
