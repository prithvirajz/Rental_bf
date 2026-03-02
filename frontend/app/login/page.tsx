"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Redirect if already logged in
        const token = localStorage.getItem('token');
        if (token) {
            router.replace('/');
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login/', { username: email, password });
            localStorage.setItem('token', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            window.dispatchEvent(new Event('auth-change'));
            router.push('/');
            router.refresh();
        } catch (err: any) {
            console.error('Login Error:', err);
            // Handle different error structures
            const msg = err.response?.data?.detail
                || err.response?.data?.error
                || 'Login failed. Please check your credentials.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
                <h1 className="text-2xl font-bold mb-2 text-center">Welcome back</h1>
                <p className="text-center text-zinc-500 mb-8">Login to manage your bookings</p>

                <ErrorMessage message={error} />

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email / Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-zinc-500">
                    Don't have an account? <Link href="/signup" className="text-black font-medium underline">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
