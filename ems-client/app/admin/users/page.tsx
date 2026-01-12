'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, Shield, Calendar, Check } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const fetcher = (url: string) => {
    const token = localStorage.getItem('token');
    return axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data);
};

interface User {
    _id: string;
    username: string;
    role: 'admin' | 'mod';
    assigned_events: { _id: string; name: string }[];
}

interface Event {
    _id: string;
    name: string;
}

const UsersPage = () => {
    const { data: usersData, error: usersError, mutate: mutateUsers } = useSWR(`${API_URL}/api/users`, fetcher);
    const { data: eventsData } = useSWR(`${API_URL}/api/events`, fetcher);
    const [showModal, setShowModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [assigningUser, setAssigningUser] = useState<User | null>(null);
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
    const [form, setForm] = useState({
        username: '',
        password: '',
        role: 'mod' as 'admin' | 'mod'
    });

    const users: User[] = usersData?.data || [];
    const events: Event[] = eventsData?.data || [];

    const openCreateModal = () => {
        setEditingUser(null);
        setForm({ username: '', password: '', role: 'mod' });
        setShowModal(true);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setForm({ username: user.username, password: '', role: user.role });
        setShowModal(true);
    };

    const openAssignModal = (user: User) => {
        setAssigningUser(user);
        setSelectedEvents(user.assigned_events.map(e => e._id));
        setShowAssignModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const payload: any = { username: form.username, role: form.role };
            if (form.password) payload.password = form.password;

            if (editingUser) {
                await axios.put(`${API_URL}/api/users/${editingUser._id}`, payload, { headers });
                toast.success('Cập nhật người dùng thành công!');
            } else {
                if (!form.password) {
                    toast.error('Mật khẩu là bắt buộc');
                    return;
                }
                payload.password = form.password;
                await axios.post(`${API_URL}/api/users`, payload, { headers });
                toast.success('Tạo người dùng thành công!');
            }
            setShowModal(false);
            mutateUsers();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const handleAssign = async () => {
        if (!assigningUser) return;
        const token = localStorage.getItem('token');

        try {
            await axios.put(
                `${API_URL}/api/users/${assigningUser._id}/assign-events`,
                { event_ids: selectedEvents },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Gán sự kiện thành công!');
            setShowAssignModal(false);
            mutateUsers();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Không thể gán sự kiện');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa người dùng này?')) return;

        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_URL}/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Đã xóa người dùng');
            mutateUsers();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Không thể xóa');
        }
    };

    const toggleEvent = (eventId: string) => {
        setSelectedEvents(prev =>
            prev.includes(eventId)
                ? prev.filter(id => id !== eventId)
                : [...prev, eventId]
        );
    };

    if (usersError) return <div className="text-red-500">Không thể tải dữ liệu</div>;
    if (!usersData) return <div className="animate-pulse">Đang tải...</div>;

    return (
        <div>
            <Toaster />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Cấp quyền</h2>
                    <p className="text-gray-500 mt-1">Quản lý tài khoản Admin và Mod</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <Plus className="w-5 h-5" />
                    Thêm người dùng
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Tên đăng nhập</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Vai trò</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Sự kiện được gán</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user.role === 'admin' ? 'bg-purple-100' : 'bg-blue-100'
                                            }`}>
                                            <Shield className={`w-5 h-5 ${user.role === 'admin' ? 'text-purple-600' : 'text-blue-600'
                                                }`} />
                                        </div>
                                        <span className="font-medium text-gray-900">{user.username}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {user.role === 'admin' ? 'Admin' : 'Mod'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {user.assigned_events.length > 0 ? (
                                            user.assigned_events.slice(0, 3).map(event => (
                                                <span key={event._id} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                                    {event.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-400 text-sm">Chưa gán</span>
                                        )}
                                        {user.assigned_events.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                                +{user.assigned_events.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => openAssignModal(user)}
                                            className="p-2 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
                                            title="Gán sự kiện"
                                        >
                                            <Calendar className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => openEditModal(user)}
                                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                                            title="Sửa"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
                                            title="Xóa"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    Chưa có người dùng nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold">
                                {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập *</label>
                                <input
                                    type="text"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mật khẩu {editingUser ? '(để trống nếu không đổi)' : '*'}
                                </label>
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required={!editingUser}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                                <select
                                    value={form.role}
                                    onChange={(e) => setForm({ ...form, role: e.target.value as any })}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option value="mod">Mod</option>
                                    <option value="admin">Admin</option>
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
                                    {editingUser ? 'Cập nhật' : 'Tạo mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Assign Events Modal */}
            {showAssignModal && assigningUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold">Gán sự kiện cho {assigningUser.username}</h3>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1">
                            {events.length > 0 ? (
                                <div className="space-y-2">
                                    {events.map(event => (
                                        <button
                                            key={event._id}
                                            onClick={() => toggleEvent(event._id)}
                                            className={`w-full flex items-center justify-between p-3 rounded-lg border transition ${selectedEvents.includes(event._id)
                                                    ? 'border-indigo-500 bg-indigo-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <span className="font-medium">{event.name}</span>
                                            {selectedEvents.includes(event._id) && (
                                                <Check className="w-5 h-5 text-indigo-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">Chưa có sự kiện nào</p>
                            )}
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={() => setShowAssignModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleAssign}
                                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                Lưu ({selectedEvents.length} sự kiện)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
