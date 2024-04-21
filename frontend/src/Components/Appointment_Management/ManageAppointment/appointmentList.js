import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from '../../Nav/adminNav'; // Corrected import statement

export default function AppointmentList() { // Renamed function to start with a capital letter

    const [appointments, setAppointments] = useState([]); // Renamed state variable to plural form "appointments"

    useEffect(() => {
        axios
            .get('http://localhost:8175/appointment/') // Added the missing colon after "http"
            .then((res) => {
                setAppointments(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    return (
        <>
            <AdminNav /> {/* Corrected component name to start with a capital letter */}
            <header /> {/* Corrected self-closing tag */}
        </>
    );
}