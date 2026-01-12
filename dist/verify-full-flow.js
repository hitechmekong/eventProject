"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_client_1 = require("socket.io-client");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const Event_1 = __importDefault(require("./models/Event"));
const Guest_1 = __importDefault(require("./models/Guest"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ems_db';
const API_URL = 'http://localhost:3000/api';
const SOCKET_URL = 'http://localhost:3000';
function verifyFlow() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Starting Full Flow Verification...');
        // 1. Connect DB
        yield mongoose_1.default.connect(MONGO_URI);
        console.log('✅ DB Connected');
        // 2. Setup Data
        // Create Event
        const event = yield Event_1.default.create({
            name: 'Test Event ' + Date.now(),
            time: new Date(),
            location: 'Test Lab',
            config: { is_checkin_open: true, enable_seat_map: true }
        });
        console.log('✅ Test Event Created:', event._id);
        // Create Guest
        const ticketCode = 'TEST-' + Date.now();
        const guest = yield Guest_1.default.create({
            name: 'Simulated Guest',
            ticket_code: ticketCode,
            event_id: event._id,
            seat_location: 'A-1'
        });
        console.log('✅ Test Guest Created:', guest.ticket_code);
        // 3. Setup Socket Client
        const socket = (0, socket_io_client_1.io)(SOCKET_URL);
        const socketPromise = new Promise((resolve, reject) => {
            socket.on('connect', () => {
                console.log('✅ Socket Connected');
                socket.emit('join_event', event._id.toString());
            });
            socket.on('new_checkin', (data) => {
                console.log('✅ Socket received new_checkin event:', data.name);
                if (data.name === 'Simulated Guest') {
                    resolve();
                }
            });
            // Timeout fallback
            setTimeout(() => reject('Socket timeout waiting for event'), 5000);
        });
        // 4. Trigger Check-in via API
        try {
            console.log('👉 Triggering API Check-in...');
            const res = yield axios_1.default.post(`${API_URL}/checkin/self`, { ticket_code: ticketCode });
            if (res.status === 200 && res.data.success) {
                console.log('✅ API Check-in Successful');
            }
            else {
                console.error('❌ API Check-in Failed', res.data);
            }
        }
        catch (error) {
            console.error('❌ API Call Failed:', error);
        }
        // 5. Wait for Socket Event
        try {
            yield socketPromise;
            console.log('🎉 Full Flow Verified Successfully!');
        }
        catch (error) {
            console.error('❌ Verification Failed:', error);
        }
        finally {
            socket.disconnect();
            // Cleanup
            yield Guest_1.default.deleteMany({ event_id: event._id });
            yield Event_1.default.deleteMany({ _id: event._id });
            yield mongoose_1.default.disconnect();
            process.exit(0);
        }
    });
}
// Check if server is running before running verify?
// For now assume user (or I) started server.
// Actually I cannot start the server in blocking mode and run this.
// I will just write this script, and instruct running it.
// But I can try to run it if I assume server is running?
// The user asked me to "test function", so I should probably spawn the server and run this.
verifyFlow();
