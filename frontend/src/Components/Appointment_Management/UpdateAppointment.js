import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function UpdateAppointment() {
  const { id } = useParams(); // Get appointment ID from URL params
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [phoneType, setPhoneType] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleServiceTypeChange = (e) => {
    // Your logic for handling service type change
  };

  const handleImageUpload = (e) => {
    // Your logic for handling image upload
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

  useEffect(() => {
    if (id) {
      // Fetch existing appointment data if ID exists
      axios
        .get(`http://localhost:8175/appointment/get/${id}`)
        .then((response) => {
          const appointmentData = response.data.appointment;
          setName(appointmentData.name);
          setEmail(appointmentData.email);
          setTelephone(appointmentData.telephone);
          setPhoneType(appointmentData.phoneType);
          setServiceType(appointmentData.serviceType);
          setDate(appointmentData.date.substring(0, 10)); // Ensure date is in proper format
          setDescription(appointmentData.description);
          setImage(appointmentData.image);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const sendData = (e) => {
    e.preventDefault();

    const updatedAppointment = {
      name,
      email,
      telephone,
      phoneType,
      serviceType,
      date,
      description,
      image,
    };

    // Send PUT request to update appointment data
    axios
      .put(`http://localhost:8175/appointment/update/${id}`, updatedAppointment)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Appointment Updated Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error updating appointment',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      
      <div className="container mx-auto px-4 py-12">
        <form
          onSubmit={sendData}
          className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold mb-6">Update Appointment</h2>
          <div className="mb-6">
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
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled
            />
          </div>
          <div className="mb-6">
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled
            />
          </div>
          <div className="mb-6">
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
              onChange={(e) => setTelephone(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Phone Type:
            </label>
            <div className="mt-2 space-y-2">
              <div>
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
              <div>
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
              <div>
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Service Type:
            </label>
            <div className="mt-2 space-y-2">
              <div>
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
              <div>
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
              <div>
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
          <div className="mb-6">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
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
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </form>
      </div>
      
    </div>
  );
}