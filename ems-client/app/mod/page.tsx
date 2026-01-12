'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { QrCode, X, Check } from 'lucide-react';

// Dynamic import for Scanner to avoid SSR issues
const Scanner = dynamic(
    () => import('@yudiel/react-qr-scanner').then((mod) => mod.Scanner),
    { ssr: false }
);

const ModPage = () => {
    const [lastScanned, setLastScanned] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [stats, setStats] = useState({ checkedIn: 0, total: 0 });

    const handleScan = async (result: any) => {
        const rawValue = result?.[0]?.rawValue;
        if (!rawValue) return;

        // De-bounce same code
        if (rawValue === lastScanned || isProcessing) return;

        setIsProcessing(true);
        setLastScanned(rawValue);
        const toastId = toast.loading('Checking in...');

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
            await axios.post(`${API_URL}/api/checkin/scan`, { ticket_code: rawValue });
            toast.success(`Success! ${rawValue}`, { id: toastId });
            setStats(prev => ({ ...prev, checkedIn: prev.checkedIn + 1 })); // Optimistic update
        } catch (error) {
            console.error(error);
            toast.error('Check-in Failed!', { id: toastId });
        } finally {
            setTimeout(() => {
                setIsProcessing(false);
                setLastScanned(null); // Allow re-scan after delay
            }, 3000);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <Toaster position="top-center" />

            {/* Header */}
            <div className="p-4 bg-gray-800 flex justify-between items-center shadow-md z-10">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-indigo-400" /> Mod Scanner
                </h1>
                <div className="text-sm bg-gray-700 px-3 py-1 rounded-full">
                    <span className="text-green-400 font-bold">{stats.checkedIn}</span> / <span className="text-gray-400">{stats.total}</span>
                </div>
            </div>

            {/* Scanner Area */}
            <div className="flex-1 relative bg-black flex flex-col justify-center overflow-hidden">
                <Scanner
                    onScan={handleScan}
                    allowMultiple={true}
                    scanDelay={2000}
                    components={{
                        onOff: true,
                        torch: true,
                        zoom: true,
                        finder: true
                    }}
                />

                {/* Overlay Status */}
                {isProcessing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 backdrop-blur-sm">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
                    </div>
                )}
            </div>

            {/* Footer Instructions */}
            <div className="p-6 bg-gray-800 text-center text-gray-400 text-sm">
                Point camera at Guest QR Code
            </div>
        </div>
    );
};

export default ModPage;
