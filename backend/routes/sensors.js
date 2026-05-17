const express = require('express');
const router = express.Router();
const db = require('../db');

// GET history
router.get('/history', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const sorted = [...db.sensorReadings].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const limited = sorted.slice(0, limit);
    res.json(limited.reverse());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET latest
router.get('/latest', (req, res) => {
  try {
    const sorted = [...db.sensorReadings].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json(sorted[0] || null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
