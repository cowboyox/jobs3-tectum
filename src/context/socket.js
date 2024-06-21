// SocketContext.js
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create a context for the socket
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_JOBS3_BACKEND, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
