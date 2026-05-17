module.exports = {
  sensorReadings: [],
  devices: [
    {
      deviceId: 'DEV-001',
      name: 'Sensor Node A (Intake)',
      provider: 'AWS IoT Core',
      lastSeen: new Date(),
      batteryLevel: 92,
      isOnline: true
    },
    {
      deviceId: 'DEV-002',
      name: 'Sensor Node B (Outflow)',
      provider: 'AWS IoT Core',
      lastSeen: new Date(),
      batteryLevel: 85,
      isOnline: true
    }
  ],
  alerts: []
};
