import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export function useWebSocket() {
  const [latestReading, setLatestReading] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const SOCKET_URL = import.meta.env.VITE_API_BASE_URL 
      ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') 
      : 'http://localhost:5000';
      
    const socket = io(SOCKET_URL, {
      reconnectionDelayMax: 10000,
      reconnection: true,
      reconnectionAttempts: 10,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('sensor:update', (data) => {
      setLatestReading(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { latestReading, isConnected };
}
