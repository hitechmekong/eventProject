"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkinRoutes_1 = __importDefault(require("./routes/checkinRoutes"));
const guestRoutes_1 = __importDefault(require("./routes/guestRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// CORS - Updated to include Authorization header for JWT
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/events', eventRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/checkin', checkinRoutes_1.default);
app.use('/api/guests', guestRoutes_1.default);
// Health Check
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
// Serve Static Frontend (Updated for Deployment)
// __dirname in compiled code = /dist, so ./public = /dist/public
// extensions: ['html'] allows /admin to serve admin.html
const path_1 = __importDefault(require("path"));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public'), {
    extensions: ['html']
}));
// SPA Fallback: Any request not handled by API or Static files returns index.html
// Express 5 requires Regex /.*/ instead of string '*'
app.get(/.*/, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public/index.html'));
});
exports.default = app;
