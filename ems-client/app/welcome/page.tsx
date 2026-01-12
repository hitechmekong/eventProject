'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io, Socket } from 'socket.io-client';
import { Wifi, Hash } from 'lucide-react';

// Types
interface Guest {
    name: string;
    avatar?: string;
    job_title?: string;
    seat?: string;
    welcome_message?: string;
    event_id?: string;
}

const WelcomeScreen = () => {
    // State
    const [queue, setQueue] = useState<Guest[]>([]);
    const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Constants
    const DISPLAY_DURATION = 30000; // 30 seconds
    const EVENT_ID = '654321'; // TODO: Get from URL or Config. Defaulting for simulation.
    const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // Adjust if backend on different port

    // 1. Initialize Socket
    useEffect(() => {
        socketRef.current = io(SOCKET_URL);

        socketRef.current.on('connect', () => {
            console.log('Connected to WebSocket server');
            setIsConnected(true);
            // Join event room
            // Assuming backend expects 'join_event'
            socketRef.current?.emit('join_event', EVENT_ID);
        });

        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
            setIsConnected(false);
        });

        socketRef.current.on('new_checkin', (guest: Guest) => {
            console.log('New check-in received:', guest);

            // Add to queue
            setQueue((prev) => [...prev, guest]);
        });

        return () => {
            socketRef.current?.disconnect();
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    // 2. Queue Logic Processing
    useEffect(() => {
        // If we are IDLE (no current guest) and Queue has data
        if (!currentGuest && queue.length > 0) {
            processNextGuest();
        }
    }, [currentGuest, queue]);

    const processNextGuest = () => {
        // Pop first guest (queue[0])
        // Ideally we should use functional update but we need to extract the guest first
        // Let's rely on queue being in dependencies. 
        // Wait, processNextGuest needs carefully handling to avoid stale closures or loops.
        // Let's do it inside the effect logic or state updater directly?

        // Better approach: 
        // We already check (!currentGuest && queue.length > 0) in useEffect.
        // So we can safely take the first one.

        const nextGuest = queue[0];
        const remainingQueue = queue.slice(1);

        setQueue(remainingQueue);
        setCurrentGuest(nextGuest);

        // Start Timer
        timerRef.current = setTimeout(() => {
            setCurrentGuest(null); // This will trigger the useEffect again.
        }, DISPLAY_DURATION);
    };


    return (
        <div className="relative w-screen h-screen bg-black overflow-hidden flex flex-col items-center justify-center text-white">

            {/* Background Decor (Grid/Gradient) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-950 to-black z-0" />
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('/grid-pattern.svg')] bg-repeat" />

            {/* Main Content Area */}
            <AnimatePresence mode="wait">

                {/* ACTIVE MODE */}
                {currentGuest ? (
                    <motion.div
                        key="active"
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 1.05 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="z-10 flex flex-col items-center text-center space-y-8 p-12 max-w-5xl w-full"
                    >
                        {/* Avatar */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                            className="relative"
                        >
                            <div className="w-64 h-64 rounded-full border-4 border-indigo-500 shadow-[0_0_60px_rgba(99,102,241,0.6)] overflow-hidden">
                                {/* Placeholder or Actual Image */}
                                <img
                                    src={currentGuest.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + currentGuest.name}
                                    alt={currentGuest.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-indigo-600 px-6 py-2 rounded-full shadow-lg">
                                <span className="text-xl font-bold">Checked In</span>
                            </div>
                        </motion.div>

                        {/* Name & Title */}
                        <div className="space-y-4">
                            <h1 className="text-7xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-2xl">
                                {currentGuest.name}
                            </h1>
                            <p className="text-3xl md:text-4xl text-indigo-300 font-medium tracking-wide">
                                {currentGuest.job_title || 'VIP Guest'}
                            </p>
                        </div>

                        {/* Seat Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col items-center min-w-[300px]"
                        >
                            <span className="text-gray-400 text-lg uppercase tracking-widest mb-2">Seat Location</span>
                            <span className="text-5xl font-mono font-bold text-yellow-400">
                                {currentGuest.seat || 'Pending'}
                            </span>
                        </motion.div>

                        <p className="text-xl italic text-gray-500 mt-8">"{currentGuest.welcome_message || 'Welcome to the party!'}"</p>

                    </motion.div>
                ) : (
                    /* IDLE MODE */
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="z-10 flex flex-col items-center justify-center space-y-8"
                    >
                        <div className="w-32 h-32 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(79,70,229,0.5)] animate-pulse">
                            {/* Logo Placeholder */}
                            <span className="text-4xl font-bold">EMS</span>
                        </div>
                        <h2 className="text-6xl font-light tracking-[0.2em] text-white">WELCOME</h2>
                        <p className="text-2xl text-gray-400 font-light">Please check in at the reception</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer Info (Always visible) */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-between px-20 z-20 text-gray-400 text-xl font-light">
                <div className="flex items-center gap-4">
                    <Wifi className="w-8 h-8" />
                    <div className="flex flex-col text-left">
                        <span className="text-sm uppercase tracking-wider text-gray-500">Wi-Fi Network</span>
                        <span className="font-semibold text-white">Event_Guest_5G</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Hash className="w-8 h-8" />
                    <div className="flex flex-col text-right">
                        <span className="text-sm uppercase tracking-wider text-gray-500">Join the converstation</span>
                        <span className="font-semibold text-white">#EMSEvent2026</span>
                    </div>
                </div>
            </div>

            {/* Debug/Status Indicator */}
            <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />

        </div>
    );
};

export default WelcomeScreen;
