import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Greetings.scss"

function Greeting() {
    const [username, setUsername] = useState('');
    const [greeting, setGreeting] = useState('');
    
    useEffect(() => {
        fetchUsername();
        generateGreeting();
    }, []); // Run once when the component mounts
    
    const fetchUsername = async () => {
        try {
            const response = await axios.get('/api/getUsername'); // Fetch username from backend
            setUsername(response.data.name); // Assuming the username is stored in the 'name' field
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    };

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
        <div>
           <p className="greeting">{greeting}, <span className="username">{username}</span></p>
            <p className='Cdate'>Your leave status as follows at {new Date().toLocaleDateString()}</p>
        </div>
    );
}

export default Greeting;
