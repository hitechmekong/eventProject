import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import SocketService from './services/SocketService';

dotenv.config();

console.error('----- DEBUGGING CONNECTION (STDERR) -----');
console.error('Current Env PORT:', process.env.PORT);
console.error('Current Env MONGO_URI:', process.env.MONGO_URI ? '******(Hidden)******' : 'NOT SET (UNDEFINED)');
console.error('-----------------------------------------');

const PORT = process.env.PORT || 3000;
// CRITICAL CHANGE: Removed localhost fallback to verify if env var is loaded
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI environment variable is missing!');
    console.error('Server requires MONGO_URI to start. Exiting...');
    process.exit(1);
}

// Create HTTP server from Express app
const server = http.createServer(app);

// Initialize Socket.io
SocketService.init(server);

// Connect to MongoDB and start server
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
        process.exit(1);
    });
