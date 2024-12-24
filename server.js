
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Store chat history
let chatHistory = [];

// Serve static files from the 'public' directory
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send chat history to the new user
  socket.emit('chat history', chatHistory);

  // Broadcast message to all users
  socket.on('chat message', (msg) => {
    chatHistory.push(msg); // Save message to chat history
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//Server reset counter; 1
