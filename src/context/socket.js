// SocketContext.js
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { backend_url } from "@/utils/variables";

// Create a context for the socket
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(backend_url); // Your server URL here
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
