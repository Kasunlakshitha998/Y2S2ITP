import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import UserNav from '../Nav/userNav';
import Footer from '../Nav/footer';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from 'react-router-dom';
import { FaCalendar } from 'react-icons/fa';

export default function AddAForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [phoneType, setPhoneType] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
      axios
        .get(`http://localhost:8175/user/getUsers/${userId}`)
        .then((result) => {
          setName(result.data.name);
          setEmail(result.data.email);
          setTelephone(result.data.number);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const sendData = async (e) => {
    e.preventDefault();

    // Check if at least one phone type is selected
    if (phoneType.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select at least one phone type!',
      });
      return;
    }

    // Check if at least one service type is selected
    if (serviceType.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select at least one service type!',
      });
      return;
    }

    const userId = Cookies.get('userId');
    const NewAppointment = {
      name,
      userId,
      email,
      telephone,
      phoneType,
      serviceType,
      date,
      description,
      image,
    };

    axios
      .post('http://localhost:8175/appointment/add', NewAppointment)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Appointment Submitted Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigator('/userAppointmentList');
      })
      .catch((err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error with Product ADD',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err);
      });
  };

  const handlePhoneTypeChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setPhoneType((prevPhoneType) => [...prevPhoneType, value]);
    } else {
      setPhoneType((prevPhoneType) =>
        prevPhoneType.filter((type) => type !== value)
      );
    }
  };

  const handleServiceTypeChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setServiceType((prevServiceType) => [...prevServiceType, value]);
    } else {
      setServiceType((prevServiceType) =>
        prevServiceType.filter((type) => type !== value)
      );
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result;
        setImage(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <UserNav />
      <div className="container mx-auto px-4 py-12">
        <form
          onSubmit={sendData}
          className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold mb-6">
            Appointment For Repair Services
          </h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="telephone"
              className="block text-sm font-medium text-gray-700"
            >
              Telephone:
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={telephone}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                setTelephone(onlyNumbers);
              }}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Type:
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="android"
                  name="phoneType"
                  value="Android"
                  onChange={handlePhoneTypeChange}
                  className="mr-2"
                />
                <label
                  htmlFor="android"
                  className="text-sm font-medium text-gray-700"
                >
                  Android
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="apple"
                  name="phoneType"
                  value="Apple"
                  onChange={handlePhoneTypeChange}
                  className="mr-2"
                />
                <label
                  htmlFor="apple"
                  className="text-sm font-medium text-gray-700"
                >
                  Apple
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="windows"
                  name="phoneType"
                  value="Windows"
                  onChange={handlePhoneTypeChange}
                  className="mr-2"
                />
                <label
                  htmlFor="windows"
                  className="text-sm font-medium text-gray-700"
                >
                  Windows
                </label>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Service Type:
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="display"
                  name="serviceType"
                  value="Display Services"
                  onChange={handleServiceTypeChange}
                  className="mr-2"
                />
                <label
                  htmlFor="display"
                  className="text-sm font-medium text-gray-700"
                >
                  Display Services
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="motherboard"
                  name="serviceType"
                  value="Motherboard Services"
                  onChange={handleServiceTypeChange}
                  className="mr-2"
                />
                <label
                  htmlFor="motherboard"
                  className="text-sm font-medium text-gray-700"
                >
                  Motherboard Services
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="other"
                  name="serviceType"
                  value="Other Services"
                  onChange={handleServiceTypeChange}
                  className="mr-2"
                />
                <label
                  htmlFor="other"
                  className="text-sm font-medium text-gray-700"
                >
                  Other Services
                </label>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date:<FaCalendar/>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Receipt:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
