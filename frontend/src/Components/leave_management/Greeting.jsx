import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import "./Greetings.scss";

function Greeting() {
    const [username, setUsername] = useState('');
    const [greeting, setGreeting] = useState('');
    
    useEffect(() => {
        fetchUsername();
        generateGreeting();
    }, []); // Run once when the component mounts
    
    const fetchUsername = async () => {
        try {
            // Assuming you have the user ID stored in localStorage or state
            const userId = localStorage.getItem('userId'); // You need to replace 'userID' with the actual key you use to store the user ID
            const response = await axios.get(`http://localhost:8175/user/getUsers/${userId}`)
            setUsername(response.data.name); // Assuming the username is stored in the 'name' field of the response data
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    };
      useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      axios
        .get(`http://localhost:8175/user/getUsers/${userId}`)
        .then((result) => {
            fetchUsername(result.data.userId);
        })
        .catch((err) => console.log(err));
    }
  }, []);

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
