"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heart, User, LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        const checkAuth = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('auth-change', checkAuth);

        // Initial check
        checkAuth();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('auth-change', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        window.dispatchEvent(new Event('auth-change'));
        setIsAuthenticated(false);
        setIsMobileMenuOpen(false);
        router.push('/login');
    };

    return (
        <>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-zinc-100 py-3" : "bg-transparent"
            )}>
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight z-50 relative text-stone-900">
                        <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                        <span>RentalByf</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
                        <Link href="/browse" className="hover:text-black transition-colors">Browse</Link>
                        <Link href="/about" className="hover:text-black transition-colors">About</Link>
                        <Link href="/safety" className="hover:text-black transition-colors">Safety</Link>
                        {isAuthenticated && (
                            <Link href="/my-bookings" className="hover:text-black transition-colors">My Bookings</Link>
                        )}
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm text-zinc-600 hover:text-black transition-colors"
                            >
                                Sign out
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login" className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-black transition-colors">
                                    Log in
                                </Link>
                                <Link href="/signup" className="px-4 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-zinc-800 transition-all">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden z-50 relative p-2 text-zinc-900"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden text-zinc-900"
                    >
                        <div className="flex flex-col gap-6 text-lg font-medium">
                            <Link href="/browse" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-zinc-100 pb-4">Browse Companions</Link>
                            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-zinc-100 pb-4">About Us</Link>
                            <Link href="/safety" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-zinc-100 pb-4">Safety</Link>

                            {isAuthenticated && (
                                <Link href="/my-bookings" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-zinc-100 pb-4">My Bookings</Link>
                            )}

                            <div className="pt-4 flex flex-col gap-4">
                                {isAuthenticated ? (
                                    <button onClick={handleLogout} className="w-full py-3 text-left text-zinc-600 hover:text-black">Sign out</button>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center border border-zinc-200 rounded-xl">Log in</Link>
                                        <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center bg-black text-white rounded-xl">Sign up</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
