import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';

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
    <nav className="bg-white shadow fixed w-full z-20 top-0 left-0 border-b max-h-25">
      <div className="px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div>
            <Link
              className="text-gray-800 text-2xl font-bold md:text-3xl hover:text-gray-700 transition-colors duration-300"
              to="/"
            >
              Tech Connect
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
<<<<<<< HEAD
        </div>

        <div className={`md:flex items-center ${isMenuOpen ? '' : 'hidden'}`}>
          <div className="flex flex-col items-center md:flex-row md:mx-6">
            <Link
              to="#"
              className={`my-1 text-lg text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0 ${
                activeLink === '/' ? 'text-indigo-500' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="#"
              className={`my-1 text-lg text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0 ${
                activeLink === '/srevice' ? 'text-indigo-500' : ''
              }`}
            >
              Srevice
            </Link>
            <Link
              to="#"
              className={`my-1 text-lg text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0 ${
                activeLink === '/contact' ? 'text-indigo-500' : ''
              }`}
            >
              Contact
            </Link>
            <Link
              to="#"
              className={`my-1 text-lg text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0 ml-4 ${
                activeLink === '/about' ? 'text-indigo-500' : ''
              }`}
            >
              About
            </Link>
=======
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? '' : 'hidden'
            }`}
          >
            <ul className="flex flex-col p-1 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-900 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
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
                  to="/addForm"
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
>>>>>>> 20f09254865fdd57a4f8765b46f0f7ff76ce793d
          </div>

          <div className="flex items-center space-x-3">
            <Link className="relative text-gray-700 hover:text-gray-600 mx-3" to="#">
              <FaShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 left-0 rounded-full bg-indigo-500 text-white p-1 text-xs"></span>
            </Link>
            <button onClick={toggleProfile} className="focus:outline-none mx-3">
              <FaUserCircle className="w-8 h-8 text-gray-500 hover:text-gray-900" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <ul>
                  <li>
                    <Link
                      to="/AccountDetails"
                      className="block py-2 px-4 hover:bg-gray-100"
                    >
                      Profile
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
      </div>
    </nav>
  );
}

export default UserNav;
