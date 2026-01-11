'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Users, UserPlus, RefreshCcw, Search } from 'lucide-react';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const AdminPage = () => {
    const { data, error, mutate } = useSWR('http://localhost:3000/api/guests', fetcher, { refreshInterval: 5000 });
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    // New user form state
    const [newUser, setNewUser] = useState({ name: '', ticket_code: '', seat_location: '' });

    const guests = data?.data || [];
    const stats = data?.stats || { total: 0, checkedIn: 0, pending: 0 };

    const filteredGuests = guests.filter((g: any) =>
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.ticket_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddGuest = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/guests', { ...newUser, event_id: '654321' }); // Default Event ID
            toast.success('Guest added');
            mutate(); // Refresh data
            setNewUser({ name: '', ticket_code: '', seat_location: '' });
            setIsAdding(false);
        } catch (err) {
            toast.error('Failed to add guest');
        }
    };

    const handleReset = async (id: string) => {
        if (!confirm('Reset check-in status?')) return;
        try {
            await axios.post(`http://localhost:3000/api/guests/${id}/reset`);
            toast.success('Status reset');
            mutate();
        } catch (err) {
            toast.error('Failed to reset');
        }
    };

    if (error) return <div className="text-red-500 p-8">Failed to load data</div>;
    if (!data) return <div className="text-white p-8">Loading dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <Toaster />

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                    <span className="font-semibold text-lg">EMS Admin</span>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <UserPlus className="w-4 h-4" /> Add Guest
                </button>
            </nav>

            <main className="max-w-7xl mx-auto p-8">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-sm font-medium uppercase">Total Guests</p>
                        <p className="text-4xl font-bold mt-2">{stats.total}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-green-600 text-sm font-medium uppercase">Checked In</p>
                        <p className="text-4xl font-bold mt-2 text-green-700">{stats.checkedIn}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-orange-500 text-sm font-medium uppercase">Pending</p>
                        <p className="text-4xl font-bold mt-2 text-orange-600">{stats.pending}</p>
                    </div>
                </div>

                {/* Add Guest Form Panel */}
                {isAdding && (
                    <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-lg mb-8 animate-in slide-in-from-top-4">
                        <form onSubmit={handleAddGuest} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Name</label>
                                <input className="w-full border rounded-lg p-2" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Ticket Code</label>
                                <input className="w-full border rounded-lg p-2" value={newUser.ticket_code} onChange={e => setNewUser({ ...newUser, ticket_code: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Seat</label>
                                <input className="w-full border rounded-lg p-2" value={newUser.seat_location} onChange={e => setNewUser({ ...newUser, seat_location: e.target.value })} />
                            </div>
                            <button type="submit" className="bg-gray-900 text-white p-2 rounded-lg hover:bg-black font-medium">Save Guest</button>
                        </form>
                    </div>
                )}

                {/* Filter Bar */}
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search guests..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Guest</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Ticket</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Seat</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-end text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredGuests.map((guest: any) => (
                                <tr key={guest._id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{guest.name}</div>
                                        <div className="text-xs text-gray-500">{guest.company}</div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-sm text-gray-600">{guest.ticket_code}</td>
                                    <td className="px-6 py-4 text-sm">{guest.seat_location || '-'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${guest.checkin_status === 'checked_in'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {guest.checkin_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-end">
                                        <button
                                            onClick={() => handleReset(guest._id)}
                                            className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                                            title="Reset Check-in"
                                        >
                                            <RefreshCcw className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredGuests.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">No guests found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    );
};

export default AdminPage;
