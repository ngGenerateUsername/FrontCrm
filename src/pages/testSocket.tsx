import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MiniCalendar from './MiniCalendar'
export default function Settings() {
  const eventDates = [
    { date: '2023-07-12', type: 'activity' },
    { date: '2023-07-15', type: 'contract' },
  ];
    const [user, setUser] = useState(null);
    const socket = io('http://localhost:8888'); // Adjust the URL according to your backend configuration
    console.log(socket);
    useEffect(() => {
      socket.on('ticket', (data) => {
        console.log("on");
        setUser(data);
      });
  
      return () => {
        socket.off('ticket');
        socket.close();
      };
    }, []);
  
    const handleGetUser = () => {
      const userId = 1; // The ID of the user you want to retrieve
  
      socket.emit('getUser', userId);
    };
	// Chakra Color Mode
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
   <MiniCalendar selectRange={false} eventDates={eventDates} />
		</Box>
	);
}
