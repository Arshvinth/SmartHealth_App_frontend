import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

const Greeting = ({ userName, showUserName = true, style = {} }) => {
    const [greeting, setGreeting] = useState('Good morning');

    useEffect(() => {
        updateGreeting();

        // Update greeting every minute
        const interval = setInterval(updateGreeting, 60000);
        return () => clearInterval(interval);
    }, []);

    const updateGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            setGreeting('Good morning');
        } else if (hour >= 12 && hour < 17) {
            setGreeting('Good afternoon');
        } else if (hour >= 17 && hour < 21) {
            setGreeting('Good evening');
        } else {
            setGreeting('Good night');
        }
    };

    return (
        <Text style={style}>
            {greeting}{showUserName && userName ? `, ${userName}` : ''}
        </Text>
    );
};

export default Greeting;