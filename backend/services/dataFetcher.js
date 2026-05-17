const cron = require('node-cron');
const db = require('../db');
const { broadcastSensorUpdate, broadcastAlert } = require('./websocketService');

// Simulated Thresholds (in a real app, these would come from settings collection)
let thresholds = {
  pH: { min: 6.5, max: 8.5 },
  turbidity: { max: 5.0 },
  tds: { max: 500 },
  temperature: { min: 10, max: 35 }
};

// Simulate sensor devices
const devices = ['DEV-001', 'DEV-002'];

function generateSimulatedData(deviceId) {
  // Generate slightly fluctuating data based on typical water quality ranges
  return {
    _id: Math.random().toString(36).substr(2, 9),
    deviceId,
    timestamp: new Date(),
    pH: (Math.random() * 2 + 6.5).toFixed(2), // 6.5 to 8.5
    turbidity: (Math.random() * 6).toFixed(2), // 0 to 6
    tds: Math.floor(Math.random() * 400 + 150), // 150 to 550
    temperature: (Math.random() * 15 + 15).toFixed(1), // 15 to 30
    sourceApi: 'simulated'
  };
}

async function checkThresholds(data) {
  const alertsToCreate = [];

  if (data.pH < thresholds.pH.min || data.pH > thresholds.pH.max) {
    alertsToCreate.push({ _id: Math.random().toString(36).substr(2, 9), parameter: 'pH', value: data.pH, threshold: data.pH > thresholds.pH.max ? thresholds.pH.max : thresholds.pH.min, severity: 'Warning', createdAt: new Date(), resolved: false });
  }
  if (data.turbidity > thresholds.turbidity.max) {
    alertsToCreate.push({ _id: Math.random().toString(36).substr(2, 9), parameter: 'turbidity', value: data.turbidity, threshold: thresholds.turbidity.max, severity: 'Danger', createdAt: new Date(), resolved: false });
  }
  if (data.tds > thresholds.tds.max) {
    alertsToCreate.push({ _id: Math.random().toString(36).substr(2, 9), parameter: 'tds', value: data.tds, threshold: thresholds.tds.max, severity: 'Warning', createdAt: new Date(), resolved: false });
  }
  
  for (let alert of alertsToCreate) {
    db.alerts.push(alert);
    broadcastAlert(alert);
  }
}

function startDataFetcher() {
  // Poll every 10 seconds
  cron.schedule('*/10 * * * * *', async () => {
    try {
      for (const deviceId of devices) {
        const data = generateSimulatedData(deviceId);
        
        // Save to DB
        db.sensorReadings.push(data);
        if (db.sensorReadings.length > 500) db.sensorReadings.shift(); // keep memory small

        // Check thresholds
        await checkThresholds(data);

        // Emit WS update
        broadcastSensorUpdate(data);
      }
    } catch (err) {
      console.error('Error fetching/simulating data:', err);
    }
  });
}

// Function to update thresholds dynamically (called by settings route)
function updateThresholds(newThresholds) {
  thresholds = { ...thresholds, ...newThresholds };
}

module.exports = {
  startDataFetcher,
  updateThresholds
};
