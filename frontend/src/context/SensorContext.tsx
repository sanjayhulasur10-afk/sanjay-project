import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useSensorData } from '../hooks/useSensorData';
import { getAlerts, getThresholds, getDevices } from '../services/api';

interface SensorContextType {
  historicalData: any[];
  latestReading: any;
  isConnected: boolean;
  alerts: any[];
  thresholds: any;
  devices: any[];
  refreshData: () => void;
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

export const SensorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { latestReading, isConnected } = useWebSocket();
  const { data: historicalData, setData: setHistoricalData } = useSensorData(50);
  
  const [alerts, setAlerts] = useState<any[]>([]);
  const [thresholds, setThresholds] = useState<any>({});
  const [devices, setDevices] = useState<any[]>([]);

  const refreshData = async () => {
    try {
      const [fetchedAlerts, fetchedThresholds, fetchedDevices] = await Promise.all([
        getAlerts(),
        getThresholds(),
        getDevices()
      ]);
      setAlerts(fetchedAlerts);
      setThresholds(fetchedThresholds);
      setDevices(fetchedDevices);
    } catch (error) {
      console.error("Failed to refresh data", error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Real-time update of historical data
  useEffect(() => {
    if (latestReading) {
      setHistoricalData(prev => {
        const newData = [...prev, latestReading];
        if (newData.length > 50) newData.shift();
        return newData;
      });
      // Optionally refresh alerts if there's a new reading
      getAlerts().then(setAlerts).catch(console.error);
    }
  }, [latestReading, setHistoricalData]);

  return (
    <SensorContext.Provider value={{ historicalData, latestReading, isConnected, alerts, thresholds, devices, refreshData }}>
      {children}
    </SensorContext.Provider>
  );
};

export const useSensorContext = () => {
  const context = useContext(SensorContext);
  if (context === undefined) {
    throw new Error('useSensorContext must be used within a SensorProvider');
  }
  return context;
};
