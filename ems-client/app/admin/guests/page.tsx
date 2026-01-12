'use client';

import React, { useState, useRef } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import {
    Plus, Edit2, Trash2, Upload, Download, QrCode,
    Ticket, Users, CheckCircle, Clock, Search, X
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const getToken = () => localStorage.getItem('token');
const fetcher = (url: string) => {
    const token = getToken();
    return axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data);
};

interface Event {
    _id: string;
    name: string;
}

interface Guest {
    _id: string;
    name: string;
    phone?: string;
    email?: string;
    company?: string;
    ticket_code: string;
    seat_location?: string;
    checkin_status: 'pending' | 'checked_in';
    checkin_time?: string;
    event_id: { _id: string; name: string } | string;
}

const GuestsPage = () => {
    const { data: eventsData } = useSWR(`${API_URL}/api/events`, fetcher);
    const [selectedEvent, setSelectedEvent] = useState<string>('');
    const { data: guestsData, error: guestsError, mutate: mutateGuests } = useSWR(
        selectedEvent ? `${API_URL}/api/guests?event_id=${selectedEvent}` : null,
        fetcher
    );

    const [showModal, setShowModal] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [qrCodes, setQrCodes] = useState<any[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        seat_location: '',
        is_vip: false
    });

    const events: Event[] = eventsData?.data || [];
    const guests: Guest[] = guestsData?.data || [];

    const filteredGuests = guests.filter(g =>
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.ticket_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (g.company?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const stats = {
        total: guests.length,
        checkedIn: guests.filter(g => g.checkin_status === 'checked_in').length,
        pending: guests.filter(g => g.checkin_status === 'pending').length
    };

    const openCreateModal = () => {
        setEditingGuest(null);
        setForm({ name: '', phone: '', email: '', company: '', seat_location: '', is_vip: false });
        setShowModal(true);
    };

    const openEditModal = (guest: Guest) => {
        setEditingGuest(guest);
        setForm({
            name: guest.name,
            phone: guest.phone || '',
            email: guest.email || '',
            company: guest.company || '',
            seat_location: guest.seat_location || '',
            is_vip: false
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const headers = { Authorization: `Bearer ${getToken()}` };

        try {
            if (editingGuest) {
                await axios.put(`${API_URL}/api/guests/${editingGuest._id}`, form, { headers });
                toast.success('Cập nhật khách thành công!');
            } else {
                await axios.post(`${API_URL}/api/guests`, { ...form, event_id: selectedEvent }, { headers });
                toast.success('Thêm khách thành công!');
            }
            setShowModal(false);
            mutateGuests();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa khách này?')) return;
        try {
            await axios.delete(`${API_URL}/api/guests/${id}`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            toast.success('Đã xóa khách');
            mutateGuests();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Không thể xóa');
        }
    };

    const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !selectedEvent) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('event_id', selectedEvent);

        try {
            const res = await axios.post(`${API_URL}/api/guests/import`, formData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(res.data.message);
            mutateGuests();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Import thất bại');
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleGenerateQR = async () => {
        if (!selectedEvent) return;
        setIsGenerating(true);

        try {
            const res = await axios.post(`${API_URL}/api/guests/generate-qr`, {
                event_id: selectedEvent,
                base_url: window.location.origin
            }, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            setQrCodes(res.data.data);
            setShowQRModal(true);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Tạo QR thất bại');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
            <Toaster />

            {/* Event Selector */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Chọn sự kiện</label>
                <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="w-full max-w-md border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                    <option value="">-- Chọn sự kiện --</option>
                    {events.map(event => (
                        <option key={event._id} value={event._id}>{event.name}</option>
                    ))}
                </select>
            </div>

            {selectedEvent && (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                    <p className="text-sm text-gray-500">Tổng khách</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.checkedIn}</p>
                                    <p className="text-sm text-gray-500">Đã check-in</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                                    <p className="text-sm text-gray-500">Chờ check-in</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
                        <div className="flex gap-3">
                            <button
                                onClick={openCreateModal}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                            >
                                <Plus className="w-5 h-5" />
                                Thêm khách
                            </button>
                            <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition">
                                <Upload className="w-5 h-5" />
                                Import Excel
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleImportExcel}
                                    className="hidden"
                                />
                            </label>
                            <button
                                onClick={handleGenerateQR}
                                disabled={isGenerating || guests.length === 0}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
                            >
                                <QrCode className="w-5 h-5" />
                                {isGenerating ? 'Đang tạo...' : 'Tạo QR Code'}
                            </button>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm kiếm..."
                                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-64"
                            />
                        </div>
                    </div>

                    {/* Guests Table */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Họ tên</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Mã vé</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Công ty</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Bàn</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredGuests.map((guest) => (
                                    <tr key={guest._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{guest.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-gray-100 rounded font-mono text-sm">
                                                {guest.ticket_code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{guest.company || '-'}</td>
                                        <td className="px-6 py-4 text-gray-600">{guest.seat_location || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${guest.checkin_status === 'checked_in'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {guest.checkin_status === 'checked_in' ? 'Đã check-in' : 'Chờ'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(guest)}
                                                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(guest._id)}
                                                    className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredGuests.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            {guests.length === 0 ? 'Chưa có khách mời nào' : 'Không tìm thấy kết quả'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold">
                                {editingGuest ? 'Chỉnh sửa khách' : 'Thêm khách mới'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Điện thoại</label>
                                    <input
                                        type="text"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Công ty</label>
                                    <input
                                        type="text"
                                        value={form.company}
                                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bàn</label>
                                    <input
                                        type="text"
                                        value={form.seat_location}
                                        onChange={(e) => setForm({ ...form, seat_location: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    {editingGuest ? 'Cập nhật' : 'Thêm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* QR Codes Modal */}
            {showQRModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold">QR Code - {qrCodes.length} khách</h3>
                            <button onClick={() => setShowQRModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {qrCodes.map((item) => (
                                    <div key={item.guest_id} className="border rounded-xl p-4 text-center">
                                        <img src={item.qr_code} alt={item.guest_name} className="w-full mb-2" />
                                        <p className="font-medium text-sm truncate">{item.guest_name}</p>
                                        <p className="text-xs text-gray-500 font-mono">{item.ticket_code}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100">
                            <button
                                onClick={() => setShowQRModal(false)}
                                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuestsPage;
