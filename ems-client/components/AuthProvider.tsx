'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface User {
    id: string;
    username: string;
    role: 'admin' | 'mod';
    assigned_events?: string[];
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Check for existing token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));

            // Set default axios header
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
        setIsLoading(false);
    }, []);

    // Protect routes
    useEffect(() => {
        if (isLoading) return;

        const publicPaths = ['/login', '/guest', '/welcome', '/', '/setup'];
        const isPublicPath = publicPaths.some(path => pathname === path || pathname?.startsWith('/guest') || pathname?.startsWith('/setup'));

        if (!token && !isPublicPath) {
            router.push('/login');
        }
    }, [token, pathname, isLoading, router]);

    const login = async (username: string, password: string) => {
        const res = await axios.post(`${API_URL}/api/auth/login`, { username, password });

        const { token: newToken, user: userData } = res.data;

        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));

        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isLoading,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
