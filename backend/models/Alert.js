const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  parameter: { type: String, required: true },
  value: { type: Number, required: true },
  threshold: { type: Number, required: true },
  severity: { type: String, enum: ['Warning', 'Danger'], required: true },
  createdAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Alert', alertSchema);
