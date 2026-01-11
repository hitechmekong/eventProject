'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Ticket, ArrowRight, UserCheck } from 'lucide-react';

const GuestPage = () => {
    const [ticketCode, setTicketCode] = useState('');
    const [guestData, setGuestData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ticketCode.trim()) return;

        setIsLoading(true);
        const toastId = toast.loading('Verifying...');

        try {
            const res = await axios.post('http://localhost:3000/api/checkin/self', { ticket_code: ticketCode });
            setGuestData(res.data.data);
            toast.success('Wait for your name!', { id: toastId });
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Invalid Ticket Code', { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    if (guestData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4 text-white">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-white/20 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/40">
                        <UserCheck className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">You're In!</h2>
                    <p className="text-indigo-200 mb-8">Welcome, {guestData.name}</p>

                    <div className="bg-black/20 rounded-xl p-4 mb-6">
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Your Seat</p>
                        <p className="text-4xl font-mono font-bold text-yellow-400">{guestData.seat_location || 'TBA'}</p>
                    </div>

                    <p className="text-sm text-gray-300">Look at the big screen!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-white">
            <Toaster />
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center transform rotate-3">
                            <Ticket className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Event Check-in</h1>
                    <p className="text-gray-400">Enter your ticket code to join</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={ticketCode}
                        onChange={(e) => setTicketCode(e.target.value)}
                        placeholder="Ex: TICKET-123"
                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-4 text-center text-xl tracking-widest focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-gray-700"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
                    >
                        {isLoading ? 'Checking...' : <>Check In <ArrowRight className="w-5 h-5" /></>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GuestPage;
