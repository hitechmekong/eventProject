'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, Calendar, Users, Table2, QrCode } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const fetcher = (url: string) => {
    const token = localStorage.getItem('token');
    return axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data);
};

interface Event {
    _id: string;
    name: string;
    description: string;
    time: string;
    location: string;
    max_guests: number;
    table_count: number;
    checkin_mechanism: 'organizer_scan' | 'guest_scan';
    is_checkin_open: boolean;
    created_by?: { username: string };
}

const EventsPage = () => {
    const { data, error, mutate } = useSWR(`${API_URL}/api/events`, fetcher);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [form, setForm] = useState({
        name: '',
        description: '',
        time: '',
        location: '',
        max_guests: 100,
        table_count: 10,
        checkin_mechanism: 'organizer_scan' as 'organizer_scan' | 'guest_scan'
    });

    const events: Event[] = data?.data || [];

    const openCreateModal = () => {
        setEditingEvent(null);
        setForm({
            name: '',
            description: '',
            time: '',
            location: '',
            max_guests: 100,
            table_count: 10,
            checkin_mechanism: 'organizer_scan'
        });
        setShowModal(true);
    };

    const openEditModal = (event: Event) => {
        setEditingEvent(event);
        setForm({
            name: event.name,
            description: event.description || '',
            time: event.time ? new Date(event.time).toISOString().slice(0, 16) : '',
            location: event.location,
            max_guests: event.max_guests,
            table_count: event.table_count,
            checkin_mechanism: event.checkin_mechanism
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        try {
            if (editingEvent) {
                await axios.put(`${API_URL}/api/events/${editingEvent._id}`, form, { headers });
                toast.success('Cập nhật sự kiện thành công!');
            } else {
                await axios.post(`${API_URL}/api/events`, form, { headers });
                toast.success('Tạo sự kiện thành công!');
            }
            setShowModal(false);
            mutate();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa sự kiện này?')) return;

        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_URL}/api/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Đã xóa sự kiện');
            mutate();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Không thể xóa');
        }
    };

    if (error) return <div className="text-red-500">Không thể tải dữ liệu</div>;
    if (!data) return <div className="animate-pulse">Đang tải...</div>;

    return (
        <div>
            <Toaster />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Quản lý Sự kiện</h2>
                    <p className="text-gray-500 mt-1">Tạo và quản lý các sự kiện check-in</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <Plus className="w-5 h-5" />
                    Tạo sự kiện
                </button>
            </div>

            {/* Events Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <div key={event._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
                        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Calendar className="w-12 h-12 text-white/80" />
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-gray-900">{event.name}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.is_checkin_open
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {event.is_checkin_open ? 'Đang mở' : 'Đã đóng'}
                                </span>
                            </div>

                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                {event.description || 'Chưa có mô tả'}
                            </p>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{event.time ? new Date(event.time).toLocaleDateString('vi-VN') : 'Chưa đặt'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>Tối đa {event.max_guests} khách</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Table2 className="w-4 h-4" />
                                    <span>{event.table_count} bàn</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <QrCode className="w-4 h-4" />
                                    <span>{event.checkin_mechanism === 'organizer_scan' ? 'BTC quét QR' : 'Khách quét QR'}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => openEditModal(event)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(event._id)}
                                    className="flex items-center justify-center px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {events.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        Chưa có sự kiện nào. Bấm "Tạo sự kiện" để bắt đầu.
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold">
                                {editingEvent ? 'Chỉnh sửa sự kiện' : 'Tạo sự kiện mới'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sự kiện *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    rows={3}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian *</label>
                                    <input
                                        type="datetime-local"
                                        value={form.time}
                                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm *</label>
                                    <input
                                        type="text"
                                        value={form.location}
                                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số khách tối đa</label>
                                    <input
                                        type="number"
                                        value={form.max_guests}
                                        onChange={(e) => setForm({ ...form, max_guests: parseInt(e.target.value) || 0 })}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        min={1}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số bàn</label>
                                    <input
                                        type="number"
                                        value={form.table_count}
                                        onChange={(e) => setForm({ ...form, table_count: parseInt(e.target.value) || 0 })}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        min={1}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cơ chế Check-in</label>
                                <select
                                    value={form.checkin_mechanism}
                                    onChange={(e) => setForm({ ...form, checkin_mechanism: e.target.value as any })}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option value="organizer_scan">BTC quét QR khách mời</option>
                                    <option value="guest_scan">Khách quét QR sự kiện</option>
                                </select>
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
                                    {editingEvent ? 'Cập nhật' : 'Tạo mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsPage;
