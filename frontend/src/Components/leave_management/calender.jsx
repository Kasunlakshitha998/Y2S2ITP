// Calendar.js

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import './Calender.scss';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8175/Holidays/');
      const holidays = response.data.map((holiday) => ({
        id: holiday._id,
        title: holiday.Hname,
        start: holiday.Date, // Assuming Date is in ISO format
        description: holiday.Description,
      }));
      setEvents(holidays);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="custom-calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => console.log(info.event)}
      />
    </div>
  );
};

export default   Calendar;
