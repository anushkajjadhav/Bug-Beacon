const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIO = require('socket.io');
require('dotenv').config();

const bugRoutes = require('./routes/bugRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: { origin: "*" }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bugs', bugRoutes);
app.use('/api/bugs', require('./routes/bugs'));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ Mongo error:", err));

// WebSocket Setup
io.on('connection', (socket) => {
    console.log('🟢 New client connected');

    socket.on('disconnect', () => {
        console.log('🔴 Client disconnected');
    });
});

// Make Socket.IO accessible in routes
app.set('socketio', io);

// Start server
const PORT = process.env.PORT || 5050;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
