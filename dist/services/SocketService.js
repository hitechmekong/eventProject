"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class SocketService {
    constructor() {
        this.io = null;
    }
    static getInstance() {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }
    init(httpServer) {
        this.io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: '*', // Allow all for now, lock down in production
                methods: ['GET', 'POST']
            }
        });
        this.io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);
            socket.on('join_event', (eventId) => {
                console.log(`Socket ${socket.id} joined event ${eventId}`);
                socket.join(eventId);
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });
        console.log('Socket.io initialized');
    }
    emit(event, data, room) {
        if (!this.io) {
            console.warn('Socket.io not initialized, cannot emit event:', event);
            return;
        }
        if (room) {
            this.io.to(room).emit(event, data);
        }
        else {
            this.io.emit(event, data);
        }
    }
}
exports.default = SocketService.getInstance();
