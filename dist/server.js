"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const SocketService_1 = __importDefault(require("./services/SocketService"));
dotenv_1.default.config();
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
const server = http_1.default.createServer(app_1.default);
// Initialize Socket.io
SocketService_1.default.init(server);
// Connect to MongoDB and start server
mongoose_1.default
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
