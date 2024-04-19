import React, { useState } from 'react';
import axios from 'axios';

export default function AddAForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [phoneType, setPhoneType] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

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
    <div className="container">
      <form onSubmit={sendData}>
        <h2>Appointment For Repair Services</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="telephone">Telephone:</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>

        <div>
          <label>Phone Type:</label><br/>
          <input
            type="checkbox"
            id="android"
            name="phoneType"
            value="Android"
            onChange={handlePhoneTypeChange}
          />
          <label htmlFor="android">Android</label><br/>
          <input
            type="checkbox"
            id="apple"
            name="phoneType"
            value="Apple"
            onChange={handlePhoneTypeChange}
          />
          <label htmlFor="apple">Apple</label><br/>
          <input
            type="checkbox"
            id="windows"
            name="phoneType"
            value="Windows"
            onChange={handlePhoneTypeChange}
          />
          <label htmlFor="windows">Windows</label>
        </div>

        <div>
          <label>Service Type:</label><br/>
          <input
            type="checkbox"
            id="display"
            name="serviceType"
            value="Display Services"
            onChange={handleServiceTypeChange}
          />
          <label htmlFor="display">Display Services</label><br/>
          <input
            type="checkbox"
            id="motherboard"
            name="serviceType"
            value="Motherboard Services"
            onChange={handleServiceTypeChange}
          />
          <label htmlFor="motherboard">Motherboard Services</label><br/>
          <input
            type="checkbox"
            id="other"
            name="serviceType"
            value="Other Services"
            onChange={handleServiceTypeChange}
          />
          <label htmlFor="other">Other Services</label>
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label><h4>Insert a </h4>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
