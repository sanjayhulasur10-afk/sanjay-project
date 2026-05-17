const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  provider: { type: String, required: true },
  lastSeen: { type: Date, default: Date.now },
  batteryLevel: { type: Number, default: 100 },
  isOnline: { type: Boolean, default: true }
});

module.exports = mongoose.model('Device', deviceSchema);
