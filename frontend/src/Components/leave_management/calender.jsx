import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
//import './custom-calendar.css'; // Import the custom CSS file

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8175/Holidays/');
      console.log('API Response:', response.data);

      const holidays = response.data.map((holiday) => ({
        id: holiday._id,
        title: `${holiday.holidayName}<br/>${holiday.description}`, 
        start: new Date(holiday.date),
      }));

      console.log('Mapped Holidays:', holidays);
      setEvents(holidays);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: eventInfo.event.title }}></div>
      </div>
    );
  };

  return (
    <div className="custom-calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        eventClick={(info) => console.log(info.event)}
        height="auto"
        contentHeight="auto"
        className="custom-calendar"
      />
    </div>
  );
};

export default Calendar;
