import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

class SocketService {
    private static instance: SocketService;
    private io: Server | null = null;

    private constructor() { }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public init(httpServer: HttpServer): void {
        this.io = new Server(httpServer, {
            cors: {
                origin: '*', // Allow all for now, lock down in production
                methods: ['GET', 'POST']
            }
        });

        this.io.on('connection', (socket: Socket) => {
            console.log('Client connected:', socket.id);

            socket.on('join_event', (eventId: string) => {
                console.log(`Socket ${socket.id} joined event ${eventId}`);
                socket.join(eventId);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });

        console.log('Socket.io initialized');
    }

    public emit(event: string, data: any, room?: string): void {
        if (!this.io) {
            console.warn('Socket.io not initialized, cannot emit event:', event);
            return;
        }

        if (room) {
            this.io.to(room).emit(event, data);
        } else {
            this.io.emit(event, data);
        }
    }
}

export default SocketService.getInstance();
