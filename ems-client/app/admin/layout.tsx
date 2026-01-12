'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
    Calendar,
    Users,
    Shield,
    LogOut,
    Menu,
    X,
    LayoutDashboard
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const { user, logout, isLoading, isAuthenticated } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    // Show loading while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    // Redirect if not authenticated or not admin
    if (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'mod')) {
        router.push('/login');
        return null;
    }

    const menuItems = [
        {
            name: 'Tổng quan',
            href: '/admin',
            icon: LayoutDashboard,
            roles: ['admin', 'mod']
        },
        {
            name: 'Sự kiện',
            href: '/admin/events',
            icon: Calendar,
            roles: ['admin', 'mod']
        },
        {
            name: 'Quản lý khách',
            href: '/admin/guests',
            icon: Users,
            roles: ['admin', 'mod']
        },
        {
            name: 'Cấp quyền',
            href: '/admin/users',
            icon: Shield,
            roles: ['admin']
        },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role || ''));

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 transform transition-transform duration-200 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-bold text-lg">EMS</span>
                    </div>
                    <button
                        className="lg:hidden text-gray-400 hover:text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* User info */}
                <div className="px-6 py-4 border-b border-gray-800">
                    <p className="text-white font-medium truncate">{user?.username}</p>
                    <p className="text-gray-400 text-sm capitalize">{user?.role}</p>
                </div>

                {/* Navigation */}
                <nav className="px-4 py-4 space-y-1">
                    {filteredMenu.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/admin' && pathname?.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                                    ${isActive
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }
                                `}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-3 py-2.5 w-full text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8 sticky top-0 z-30">
                    <button
                        className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="ml-4 lg:ml-0">
                        <h1 className="text-lg font-semibold text-gray-900">
                            {filteredMenu.find(item =>
                                pathname === item.href ||
                                (item.href !== '/admin' && pathname?.startsWith(item.href))
                            )?.name || 'Dashboard'}
                        </h1>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
