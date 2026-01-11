import mongoose from 'mongoose';
import { io } from 'socket.io-client';
import axios from 'axios';
import dotenv from 'dotenv';
import Event from './models/Event';
import Guest from './models/Guest';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ems_db';
const API_URL = 'http://localhost:3000/api';
const SOCKET_URL = 'http://localhost:3000';

async function verifyFlow() {
    console.log('Starting Full Flow Verification...');

    // 1. Connect DB
    await mongoose.connect(MONGO_URI);
    console.log('✅ DB Connected');

    // 2. Setup Data
    // Create Event
    const event = await Event.create({
        name: 'Test Event ' + Date.now(),
        time: new Date(),
        location: 'Test Lab',
        config: { is_checkin_open: true, enable_seat_map: true }
    });
    console.log('✅ Test Event Created:', event._id);

    // Create Guest
    const ticketCode = 'TEST-' + Date.now();
    const guest = await Guest.create({
        name: 'Simulated Guest',
        ticket_code: ticketCode,
        event_id: event._id,
        seat_location: 'A-1'
    });
    console.log('✅ Test Guest Created:', guest.ticket_code);

    // 3. Setup Socket Client
    const socket = io(SOCKET_URL);

    const socketPromise = new Promise<void>((resolve, reject) => {
        socket.on('connect', () => {
            console.log('✅ Socket Connected');
            socket.emit('join_event', event._id.toString());
        });

        socket.on('new_checkin', (data: any) => {
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
        const res = await axios.post(`${API_URL}/checkin/self`, { ticket_code: ticketCode });
        if (res.status === 200 && res.data.success) {
            console.log('✅ API Check-in Successful');
        } else {
            console.error('❌ API Check-in Failed', res.data);
        }
    } catch (error) {
        console.error('❌ API Call Failed:', error);
    }

    // 5. Wait for Socket Event
    try {
        await socketPromise;
        console.log('🎉 Full Flow Verified Successfully!');
    } catch (error) {
        console.error('❌ Verification Failed:', error);
    } finally {
        socket.disconnect();
        // Cleanup
        await Guest.deleteMany({ event_id: event._id });
        await Event.deleteMany({ _id: event._id });
        await mongoose.disconnect();
        process.exit(0);
    }
}

// Check if server is running before running verify?
// For now assume user (or I) started server.
// Actually I cannot start the server in blocking mode and run this.
// I will just write this script, and instruct running it.
// But I can try to run it if I assume server is running?
// The user asked me to "test function", so I should probably spawn the server and run this.

verifyFlow();
