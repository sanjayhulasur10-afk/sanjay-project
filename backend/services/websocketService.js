const { Server } = require('socket.io');

let io;

function initWebSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*', // For development
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function broadcastSensorUpdate(data) {
  if (io) {
    io.emit('sensor:update', data);
  }
}

function broadcastAlert(alert) {
  if (io) {
    io.emit('alert:new', alert);
  }
}

module.exports = {
  initWebSocket,
  broadcastSensorUpdate,
  broadcastAlert
};
