"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkinRoutes_1 = __importDefault(require("./routes/checkinRoutes"));
const guestRoutes_1 = __importDefault(require("./routes/guestRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Cors (Add if needed given we are doing cross-origin from Next.js potentially if on different ports)
// For now assuming proxy or same origin dev
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
// Routes
app.use('/api/checkin', checkinRoutes_1.default);
app.use('/api/guests', guestRoutes_1.default);
// Health Check
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
exports.default = app;
