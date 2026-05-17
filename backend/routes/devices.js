const express = require('express');
const router = express.Router();
const db = require('../db');

// GET devices
router.get('/', (req, res) => {
  try {
    res.json(db.devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
