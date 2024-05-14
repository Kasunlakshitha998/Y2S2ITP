import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
// Import Tailwind CSS
// Ensure Tailwind CSS is imported

function Greeting() {
    const [username, setUsername] = useState('');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const fetchUsername = async (userId) => {
            try {
                const response = await axios.get(`http://localhost:8175/user/getUsers/${userId}`);
                setUsername(response.data.name); // Assuming the username is stored in the 'name' field of the response data
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        const userId = Cookies.get("userId");
        if (userId) {
            fetchUsername(userId);
        }
        
        generateGreeting();
    }, []); // Run once when the component mounts

    const generateGreeting = () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        let greetingMessage = '';
        if (currentHour < 12) {
            greetingMessage = 'Good morning';
        } else if (currentHour < 18) {
            greetingMessage = 'Good afternoon';
        } else {
            greetingMessage = 'Good evening';
        }
        setGreeting(greetingMessage);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <p className="text-2xl font-semibold text-gray-800">
                {greeting}, <span className="text-blue-600">{username}</span>
            </p>
            <p className="text-sm text-gray-600">
                Your leave status as follows at {new Date().toLocaleDateString()}
            </p>
        </div>
    );
}

export default Greeting;
