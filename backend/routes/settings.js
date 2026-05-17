const express = require('express');
const router = express.Router();
const { updateThresholds } = require('../services/dataFetcher');

// Mock settings storage (in memory for simplicity in this demo)
let currentThresholds = {
  pH: { min: 6.5, max: 8.5 },
  turbidity: { max: 5.0 },
  tds: { max: 500 },
  temperature: { min: 10, max: 35 }
};

// GET thresholds
router.get('/', (req, res) => {
  res.json(currentThresholds);
});

// POST thresholds
router.post('/', (req, res) => {
  try {
    currentThresholds = { ...currentThresholds, ...req.body };
    updateThresholds(currentThresholds); // Update in dataFetcher
    res.json(currentThresholds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
