const mongoose = require('mongoose');

const sensorReadingSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  pH: { type: Number, required: true },
  turbidity: { type: Number, required: true },
  tds: { type: Number, required: true },
  temperature: { type: Number, required: true },
  rawPayload: { type: Object },
  sourceApi: { type: String, default: 'simulated' }
});

module.exports = mongoose.model('SensorReading', sensorReadingSchema);
