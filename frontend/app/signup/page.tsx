"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isBoyfriend, setIsBoyfriend] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/register/', {
                username,
                email,
                password,
                is_boyfriend: isBoyfriend
            });

            // Auto login
            const res = await api.post('/auth/login/', { username, password });
            localStorage.setItem('token', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            window.dispatchEvent(new Event('auth-change'));

            router.push('/');
            router.refresh();
        } catch (err) {
            setError('Signup failed. Username might be taken.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
                <h1 className="text-2xl font-bold mb-2 text-center">Create Account</h1>
                <p className="text-center text-zinc-500 mb-8">Join our community</p>

                <ErrorMessage message={error} />

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
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

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="isBoyfriend"
                            checked={isBoyfriend}
                            onChange={(e) => setIsBoyfriend(e.target.checked)}
                            className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black"
                        />
                        <label htmlFor="isBoyfriend" className="text-sm font-medium select-none cursor-pointer">
                            I want to be a companion
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50 mt-4"
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-zinc-500">
                    Already have an account? <Link href="/login" className="text-black font-medium underline">Log in</Link>
                </div>
            </div>
        </div>
    );
}
