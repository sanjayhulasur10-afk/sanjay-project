require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { initWebSocket } = require('./services/websocketService');
const { startDataFetcher } = require('./services/dataFetcher');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sensors', require('./routes/sensors'));
app.use('/api/devices', require('./routes/devices'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

const startServer = () => {
  console.log('Using local in-memory array database.');
  
  // Initialize WebSocket Server
  initWebSocket(server);

  // Start fetching/simulating data
  startDataFetcher();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
