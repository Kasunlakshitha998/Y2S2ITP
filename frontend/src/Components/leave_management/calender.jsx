import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8175/Holidays/');
      console.log('API Response:', response.data); // Log the API response
  
      // Ensure the API response is what you expect
      const holidays = response.data.map((holiday) => ({
        id: holiday._id,
        title: holiday.holidayName, // Use Hname for the title
        start: new Date(holiday.date), // Use date field directly with new Date() constructor
        description: holiday.Description, // Use Description for the description
      }));
  
      console.log('Mapped Holidays:', holidays); // Log the mapped events
      setEvents(holidays);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="custom-calendar-container p-4 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => console.log(info.event)}
        height="auto"
        contentHeight="auto"
      />
    </div>
  );
};

export default Calendar;
