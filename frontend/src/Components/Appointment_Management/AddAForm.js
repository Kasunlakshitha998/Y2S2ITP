import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'; // Import Link from React Router


export default function AddAForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [phoneType, setPhoneType] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
        axios.get(`http://localhost:8175/user/getUsers/${userId}`)
            .then(result => {
                setName(result.data.name);
                setEmail(result.data.email);
                setTelephone(result.data.number); // Assuming 'telephone' is the field name for the phone number
                // setUserImage(result.data.image); // Assuming 'image' is the field name for the user image
            })
            .catch(err => console.log(err));
    }
  }, []);

  const sendData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8175/appointment/add", {
        name,
        email,
        telephone,
        phoneType,
        serviceType,
        date,
        description
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handlePhoneTypeChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setPhoneType(prevPhoneType => [...prevPhoneType, value]); 
    } else {
      setPhoneType(prevPhoneType => prevPhoneType.filter(type => type !== value)); 
    }
  };

  const handleServiceTypeChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setServiceType(prevServiceType => [...prevServiceType, value]); 
    } else {
      setServiceType(prevServiceType => prevServiceType.filter(type => type !== value)); 
    }
  };

  return (
    




    <div className="container mx-auto px-8 py-12">
      <form onSubmit={sendData} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Appointment For Repair Services</h2>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
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
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone:</label>
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
          <label className="block text-sm font-medium text-gray-700">Phone Type:</label>
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
              <label htmlFor="android" className="text-sm font-medium text-gray-700">Android</label>
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
              <label htmlFor="apple" className="text-sm font-medium text-gray-700">Apple</label>
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
              <label htmlFor="windows" className="text-sm font-medium text-gray-700">Windows</label>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Service Type:</label>
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
              <label htmlFor="display" className="text-sm font-medium text-gray-700">Display Services</label>
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
              <label htmlFor="motherboard" className="text-sm font-medium text-gray-700">Motherboard Services</label>
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
              <label htmlFor="other" className="text-sm font-medium text-gray-700">Other Services</label>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit
        </button>
      </form>
    </div>
   
  );
}
