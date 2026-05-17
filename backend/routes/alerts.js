const express = require('express');
const router = express.Router();
const db = require('../db');

// GET alerts
router.get('/', (req, res) => {
  try {
    const sorted = [...db.alerts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(sorted.slice(0, 50));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST resolve
router.post('/:id/resolve', (req, res) => {
  try {
    const alert = db.alerts.find(a => a._id === req.params.id);
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    
    alert.resolved = true;
    res.json(alert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
